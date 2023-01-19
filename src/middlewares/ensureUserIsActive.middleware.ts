import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";

const ensureUserIsActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const userRepo = AppDataSource.getRepository(Users)

    const user = await userRepo.findOneBy({id: req.params.id})

    if(!user!.isActive){
        throw new AppError("User is not active", 409)
    }

    return next()

}

export default ensureUserIsActiveMiddleware;