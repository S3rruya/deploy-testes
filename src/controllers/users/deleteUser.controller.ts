import { Request, Response } from "express";
import { deleteUserService } from "../../services";

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const userDeleted = await deleteUserService(userId)
    return res.status(204).json(userDeleted)
}

export default deleteUserController;