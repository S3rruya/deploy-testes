import { Request, Response } from "express";
import { listUserService } from "../../services";

const listUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const user = await listUserService(userId)
    return res.status(200).json(user)
}

export default listUserController;