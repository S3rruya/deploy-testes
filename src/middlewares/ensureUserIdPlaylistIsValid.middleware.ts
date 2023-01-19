import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Playlists } from "../entities/playlists.entities";
import { AppError } from "../errors";

const ensureUserIdPlaylistIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const playlistRepository = AppDataSource.getRepository(Playlists)

    const playlist = await playlistRepository.createQueryBuilder("playlists")
    .innerJoinAndSelect("playlists.user", "users")
    .where("playlists.user = :id_user", { id_user: req.params.id})
    .getMany()

    if(playlist.length < 1){
        throw new AppError("User has not playlist!", 404)
    }

    return next()
}
export default ensureUserIdPlaylistIsValidMiddleware;
