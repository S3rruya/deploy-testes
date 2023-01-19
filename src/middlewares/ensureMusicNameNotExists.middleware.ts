import { NextFunction, Request, Response } from "express";
import { ILike } from "typeorm";
import AppDataSource from "../data-source";
import { Musics } from "../entities/musics.entities";
import { AppError } from "../errors";

const ensureMusicNameNotExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const musicsRepo = AppDataSource.getRepository(Musics)
    const findMusic = await musicsRepo.findOne({
        relations: {
            performer: true
        },
        where: {
            name: ILike(`${req.body.name}`),
            performer: {
                name: req.user.name
            }
        },
    })

    if(findMusic){
        throw new AppError("Music already exists", 401)
    }
    return next()
}

export default ensureMusicNameNotExistsMiddleware;