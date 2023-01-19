import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Genres } from "../entities/genres.entities";
import { AppError } from "../errors";

const ensureExistsGenreMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const genreRepository = AppDataSource.getRepository(Genres)

    const genre = await genreRepository.findOneBy({
        id: req.params.id
    })

    if(!genre){
        throw new AppError("Genre not exists!", 404)
    }

    return next()

}
export default ensureExistsGenreMiddleware;