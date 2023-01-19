import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Albums } from "../entities/albuns.entities";
import { AppError } from "../errors";

const ensureAlbumIdIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const albumRepository = AppDataSource.getRepository(Albums)

    const album = await albumRepository.findOneBy({
        id: req.params.id
    })

    if(!album){
        throw new AppError("Album not exists!", 404)
    }

    return next()
}
export default ensureAlbumIdIsValidMiddleware;
