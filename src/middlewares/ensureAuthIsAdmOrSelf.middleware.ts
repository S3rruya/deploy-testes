import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";


const ensureAuthAdminOrSelfMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if(req.user!.isAdmin || req.user.id === req.params.id){
        return next()
    }
    
    throw new AppError("Not permission", 403)

}
export default ensureAuthAdminOrSelfMiddleware;