import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { reactiveUserService } from "../../services";


const reactivateUsersController = async(req: Request, res: Response) => {
    
    const userData: IUserLogin = req.body
    const userReactivate = await reactiveUserService(userData)
    return res.status(200).json(userReactivate)

}

export default reactivateUsersController