import { Request, Response } from "express";
import { IUserPatchRequest, IUserResponse } from "../../interfaces/users";
import { patchUserService } from "../../services";

const patchUserController = async (req: Request, res: Response) => {
    const userDataUpdated: IUserPatchRequest = req.body 
    const userData: IUserResponse = req.providedUser
    const data = await patchUserService(userDataUpdated, userData)
    return res.status(200).json(data)
}

export default patchUserController;