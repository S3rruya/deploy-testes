import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Playlists } from "../entities/playlists.entities";
import { AppError } from "../errors";

const ensurePlaylistExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const playlistRepo = AppDataSource.getRepository(Playlists)

    const playlist = await playlistRepo.findOne({
        where: {
            id: req.params.id
        },
        relations: {
            user: true,
            musics: true
        }
    })

    if(!playlist || !playlist.isActive) {
        throw new AppError("Playlist not exists", 404)
    }

    req.providedPlaylist = playlist

    return next()
}

export default ensurePlaylistExistsMiddleware