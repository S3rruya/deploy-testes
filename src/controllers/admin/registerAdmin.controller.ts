import { Request, Response } from "express";
import { IAdminRequest } from "../../interfaces/admin";
import { IUserRequest } from "../../interfaces/users";
import { registerAdminService } from "../../services";

const registerAdminController = async (req: Request, res: Response) => {
    const adminData: IAdminRequest = req.body
    const newAdmin = await registerAdminService(adminData)
    return res.status(201).json(newAdmin)
}

export default registerAdminController;