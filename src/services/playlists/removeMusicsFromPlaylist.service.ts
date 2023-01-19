import { Request } from "express";
import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";
import { Playlists } from "../../entities/playlists.entities";
import { AppError } from "../../errors";
import { IPlaylistsResponse } from "../../interfaces/playlists";
import { listAllPlaylistsSerializer } from "../../serializers/playlists";

const removeMusicsFromPlaylistsService = async (req: Request): Promise<IPlaylistsResponse> => {
    const playlist = req.providedPlaylist;
    const musicId = req.body.id;
    const musicsRepo = AppDataSource.getRepository(Musics);
    const playlistsRepo = AppDataSource.getRepository(Playlists);

    const findMusic = await musicsRepo.findOne({
        where: {
            id: musicId,
            isActive: true
        }
    })

    const findMusicOnPlaylist = await playlistsRepo.findOne({
        where: {
            isActive: true,
            id: playlist.id,
            musics: {
                id: musicId,
                isActive: true,
            }

        }
    })
    if (!findMusic) {
        throw new AppError("Music not found.", 403);
    }
    if (!findMusicOnPlaylist) {
        throw new AppError("Music isn't in playlist.", 409)
    }

    const newMusics = playlist.musics.filter((music) => music.id != findMusic.id);
    playlist.musics = newMusics;

    const sumTime = playlist.duration.split(":");
    const time = findMusic.duration.split(":");
    const dateTime = new Date();
    dateTime.setHours(
        Number(sumTime[0]) - Number(time[0]),
        Number(sumTime[1]) - Number(time[1]),
        Number(sumTime[2]) - Number(time[2])
    );
    const hours = dateTime.getHours() > 9 ? dateTime.getHours() : "0" + dateTime.getHours();
    const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : "0" + dateTime.getMinutes();
    const seconds = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : "0" + dateTime.getSeconds();
    const durationStr = `${hours}:${minutes}:${seconds}`;
    playlist.duration = durationStr;

    await playlistsRepo.save(playlist);
    const response = await listAllPlaylistsSerializer.validate(playlist, {
        stripUnknown: true
    })

    return response;
}

export default removeMusicsFromPlaylistsService;