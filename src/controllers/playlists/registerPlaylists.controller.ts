import { Request, Response } from "express";
import { IPlaylistRequest } from "../../interfaces/playlists";
import { registerPlaylistsService } from "../../services";


const registerPlaylistsController = async (req: Request, res: Response) => {

    const dataPlaylist: IPlaylistRequest = req.body
    const newAPlaylist = await registerPlaylistsService(dataPlaylist, req.user)

    return res.status(201).json(newAPlaylist)

}


export default registerPlaylistsController