import { Request, Response } from "express";
import { listAllPerformersService } from "../../services";

const listAllPerformersController = async (req: Request, res: Response) => {
  const listPerformers = await listAllPerformersService()
  return res.status(200).json(listPerformers)
}

export default listAllPerformersController;
