
import { Request, Response } from "express";
import { deletePLaylistService } from "../../services";

const deletePlaylistController = async (req: Request, res: Response) => {
    const playlistId: string = req.params.id
    const playlist = await deletePLaylistService(playlistId)
    return res.status(204).json(playlist)
}

export default deletePlaylistController