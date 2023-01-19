import { Request, Response } from "express";
import { Playlists } from "../../entities/playlists.entities";
import { IPlaylistRequest } from "../../interfaces/playlists";
import { patchPlaylistsService } from "../../services";


const patchPlaylistsController = async (req: Request, res: Response) => {

    const updateDataPlaylist: IPlaylistRequest = req.body
    const playlistToUpdate: Playlists = req.providedPlaylist

    const updatePlaylist = await patchPlaylistsService(updateDataPlaylist, playlistToUpdate)

    return res.status(200).json(updatePlaylist)
}

export default patchPlaylistsController