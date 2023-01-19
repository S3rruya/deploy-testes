import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { userRegisterResponseSerializer } from "../serializers/users";


const ensureAuthMiddleware = async (req: Request, res:Response, next: NextFunction) => {
    

    let token = req.headers.authorization

    if(!token){
        throw new AppError("Invalid token", 401)
    }
    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY as string, async (error, decoded: any) => {
        if(error){

            return res.status(401).json({ message: "Invalid token" })

        }
        const userRepo = AppDataSource.getRepository(Users)
        const user = await userRepo.findOne({ where: { id: decoded.sub as string}})
        if(!user){
            return res.status(401).json({ message: "Invalid token" })
        }
        const userFiltered = await userRegisterResponseSerializer.validate(user, {
            stripUnknown: true
        })
        
        req.user = userFiltered

        return next()
    })

}
export default ensureAuthMiddleware;