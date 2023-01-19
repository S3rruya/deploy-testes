import { Request, Response } from "express";
import { removeMusicFromAlbumService } from "../../services";


const removeMusicFromAlbumController = async (req: Request, res: Response) => {
    const albumID: string = req.params.id
    const musicID: string = req.body.id

    const data = await removeMusicFromAlbumService(albumID, musicID)

    return res.status(204).json(data)
}

export default removeMusicFromAlbumController