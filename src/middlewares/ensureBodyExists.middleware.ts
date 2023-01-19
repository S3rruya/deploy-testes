import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureBodyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if(Object.keys(req.body).length < 1){
        throw new AppError("Body expected.", 400)
    }
    return next()
}

export default ensureBodyExistsMiddleware;