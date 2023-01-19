import { Request, Response } from "express"
import { listUniqueMusicService } from "../../services"

const listUniqueMusicController = async (req: Request, res: Response) => {
    const musicId: string = req.params.id
    const music = await listUniqueMusicService(musicId)
    return res.status(200).json(music)
}

export default listUniqueMusicController