import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { validate } from "uuid";


const ensureUUIDIsValidMiddleware =async (req: Request, res: Response, next: NextFunction) => {
    if(validate(req.params.id)){
        return next()
    }
    throw new AppError("UUID format not valid", 409)
};

export default ensureUUIDIsValidMiddleware;