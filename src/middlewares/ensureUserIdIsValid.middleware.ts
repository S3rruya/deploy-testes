import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";

const ensureUserIdIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(Users)

    const findUser = await userRepo.findOneBy({id: req.params.id})

    if(!findUser) {
        throw new AppError("User not exists", 404)
    }
    
    req.providedUser = findUser
    return next()
}

export default ensureUserIdIsValidMiddleware;