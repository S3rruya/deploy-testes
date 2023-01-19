import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services";


const createloginController = async(req: Request, res: Response) => {
    
    const sessionData: IUserLogin = req.body
    const token = await loginService(sessionData)
    return res.json({token})

}

export default createloginController

