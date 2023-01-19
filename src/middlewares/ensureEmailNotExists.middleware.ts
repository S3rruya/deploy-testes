import { NextFunction, Request, Response } from "express";
import { ILike } from "typeorm";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";

const ensureEmailNotExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    if(email){
        const userRepo = AppDataSource.getRepository(Users)
        const user = await userRepo.findOne({withDeleted: true, where: { email: ILike(`${email}`)}})
        if(user){
            throw new AppError("Email already in use.", 402)
        }
    }
    
    return next()
}

export default ensureEmailNotExistsMiddleware;