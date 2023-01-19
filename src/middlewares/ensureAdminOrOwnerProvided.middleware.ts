import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import AppDataSource from "../data-source";
import { Musics } from "../entities/musics.entities";


const ensureAuthIsAdmOrOwnerProvidedMiddleware = async (req: Request, res:Response, next: NextFunction) => {

    const musicRepository = AppDataSource.getRepository(Musics)

    const musics = await musicRepository.createQueryBuilder("musics")
    .innerJoinAndSelect("musics.performer", "users")
    .where("users.id = :id_owner", { id_owner: req.user.id})
    .andWhere("musics.id = :id_music", { id_music: req.body.id })
    .getOne()

    if(!musics){
        throw new AppError("You don't own such music.", 403)  
    }

    if(!musics.isActive){
        throw new AppError("music has already been deleted", 403)
    }

   
    if(req.user.isAdmin || req.user.id === musics.performer.id){
        return next()
    }
    


    throw new AppError("Not permission", 403)

}

export default ensureAuthIsAdmOrOwnerProvidedMiddleware