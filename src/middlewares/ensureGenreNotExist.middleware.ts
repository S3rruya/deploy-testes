import { NextFunction, Request, Response } from "express";
import { ILike } from "typeorm";
import AppDataSource from "../data-source";
import { Genres } from "../entities/genres.entities";
import { AppError } from "../errors";

const ensureGenreNotExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const genreRepo = AppDataSource.getRepository(Genres);
    const genre = await genreRepo.findOne({
        where: {name: ILike(`${name}`)},
    });

    if(genre) {
        throw new AppError("Genre already exists", 400);
    }
    return next();
}

export default ensureGenreNotExistMiddleware;