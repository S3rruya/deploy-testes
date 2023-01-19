import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors";
import { userSerializer } from "../serializers/users";

const ensureUserPatchSerializerMiddleware = (serializer: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try{
        const validatedPatchBody = await serializer.validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
        })
        req.validatedPatchBody = validatedPatchBody
        return next()
    }catch(error: any){
        return res.status(400).json({
            error: error.errors
        })
    }
}

export default ensureUserPatchSerializerMiddleware;