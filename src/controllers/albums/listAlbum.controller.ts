import { Request, Response } from "express";
import { listAlbumService } from "../../services";

const listAlbumController = async (req: Request, res: Response) => {
    const idAlbum: string = req.params.id
    const album = await listAlbumService(idAlbum)
    return res.status(200).json(album)
}
export default listAlbumController;