import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";
import { Playlists } from "../../entities/playlists.entities";
import { AppError } from "../../errors";
import { IPlaylistsResponse } from "../../interfaces/playlists";
import { listAllPlaylistsSerializer } from "../../serializers/playlists";

const addMusicsToPlaylistService = async (req: Request): Promise<IPlaylistsResponse> => {
    const musicId = req.body.id;
    const userId = req.user.id;
    const playlist = req.providedPlaylist;
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
    if (findMusicOnPlaylist) {
        throw new AppError("Music already added before", 409)
    }

    const sumTime = findMusic!.duration.split(":");
    const time = playlist.duration.split(":");
    const dateTime = new Date();
    dateTime.setHours(
        Number(sumTime[0]) + Number(time[0]),
        Number(sumTime[1]) + Number(time[1]),
        Number(sumTime[2]) + Number(time[2])
    );
    const hours = dateTime.getHours() > 9 ? dateTime.getHours() : "0" + dateTime.getHours();
    const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : "0" + dateTime.getMinutes();
    const seconds = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : "0" + dateTime.getSeconds();

    const durationStr = `${hours}:${minutes}:${seconds}`;
    playlist.musics = [...playlist.musics, findMusic];
    playlist.duration = durationStr;
    await playlistsRepo.save(playlist);

    const response = await listAllPlaylistsSerializer.validate(playlist, {
        stripUnknown: true
    })

    return response;
}

export default addMusicsToPlaylistService;