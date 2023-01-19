import { Request, Response } from "express";
import { listAllPlaylistsService } from "../../services";

const listAllPlaylistsController = async (req: Request, res: Response) => {
    const playlists = await listAllPlaylistsService()
    return res.status(200).json(playlists)
}
export default listAllPlaylistsController;