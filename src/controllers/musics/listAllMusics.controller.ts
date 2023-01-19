import { Request, Response } from "express";
import { listAllMusicsService } from "../../services";

const listAllMusicsController = async (req: Request, res: Response) => {
    const musicsList = await listAllMusicsService()
    return res.status(200).json(musicsList)
}

export default listAllMusicsController