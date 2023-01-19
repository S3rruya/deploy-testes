import { Request, Response } from "express";
import { listAllMusicsByGenrerService } from "../../services";

const listAllMusicsByGenrerController = async (req: Request, res: Response) => {
    const idGenrer: string = req.params.id
    const musics = await listAllMusicsByGenrerService(idGenrer)
    return res.status(200).json(musics)
}
export default listAllMusicsByGenrerController;