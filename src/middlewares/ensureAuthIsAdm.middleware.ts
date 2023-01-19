import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";


const ensureAuthAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user.isAdmin){
        return next()
    }
    
    throw new AppError("Not permission", 403)
}
export default ensureAuthAdminMiddleware;