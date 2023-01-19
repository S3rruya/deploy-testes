import { Request, Response } from "express";
import { deleteAlbumService } from "../../services";


const deleteAlbumController = async (req: Request, res: Response) => {
    const albumId: string = req.params.id
    const deletedAlbum = await deleteAlbumService(albumId)
    return res.status(204).json(deletedAlbum)
}

export default deleteAlbumController