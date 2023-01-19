import { Request, Response } from "express";
import { Playlists } from "../../entities/playlists.entities";
import { listUniquePlaylistService } from "../../services";

const listUniquePlaylistController = async (req: Request, res: Response) => {
    const foundedPlaylist = req.providedPlaylist
    const playlist = await listUniquePlaylistService(foundedPlaylist)
    return res.status(200).json(playlist)
}

export default listUniquePlaylistController