import { Request, Response } from "express";
import { listUserPlaylistService } from "../../services";

const listUserPlaylistController = async (req: Request, res: Response) => {
    const playlistId: string = req.params.id
    const playlists = await listUserPlaylistService(playlistId)
    return res.status(200).json(playlists)
}
export default listUserPlaylistController;