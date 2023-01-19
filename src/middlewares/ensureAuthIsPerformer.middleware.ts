import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";


const ensureAuthIsPerformerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user.isPerformer){
        return next()
    }
    
    throw new AppError("User must be a performer.", 403)
}
export default ensureAuthIsPerformerMiddleware;