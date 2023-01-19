import { Request, Response } from "express";
import { deleteMusicService } from "../../services";


const deleteMusicController = async (req: Request, res: Response) => {
    const musicId: string = req.params.id
    const musicDeleted = await deleteMusicService(musicId)
    return res.status(204).json(musicDeleted)
}

export default deleteMusicController;