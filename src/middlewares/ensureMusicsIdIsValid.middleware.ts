import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Musics } from "../entities/musics.entities";
import { AppError } from "../errors";

const ensureMusicIdIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const musicRepo = AppDataSource.getRepository(Musics)

    const findMusic = await musicRepo.findOneBy({id: req.params.id})


    if(!findMusic) {
        throw new AppError("User not exists", 404)
    }

    req.providedMusics = findMusic
    

    if(req.body.id !== undefined){
        throw new AppError("Id Cannot Be Changed", 403)
    }
    
    
    return next()
}

export default ensureMusicIdIsValidMiddleware;