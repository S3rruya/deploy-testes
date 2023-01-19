import { Request, Response } from "express";
import { listAllUsersService } from "../../services";

const listAllUsersController = async (req: Request, res: Response) => {
  const listUsers = await listAllUsersService()
  return res.status(200).json(listUsers)
}

export default listAllUsersController;
