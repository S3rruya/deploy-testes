import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";


const ensureAdminOrOwnerPlaylistMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if(req.user.id === req.providedPlaylist.user.id || req.user.isAdmin){
        return next()
    }

    throw new AppError("You don't own such playlists.", 403)
}

export default ensureAdminOrOwnerPlaylistMiddleware