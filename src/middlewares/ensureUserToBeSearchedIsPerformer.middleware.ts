import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";


const ensureUserToBeSearchedIsPerformerMiddleware = async (req: Request, res:Response, next: NextFunction) =>{
    const verifyPerformer: string = req.params.id

    const users = AppDataSource.getRepository(Users)

    const findPerformer = await users.findOneBy({
        id: verifyPerformer
    })

    if(!findPerformer){
        throw new AppError("User is not a Performer", 400)
    }

    return next()
}

export default ensureUserToBeSearchedIsPerformerMiddleware