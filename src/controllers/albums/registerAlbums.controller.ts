import { Request, Response } from "express";
import { IAlbumRequest } from "../../interfaces/albums";
import { registerAlbumService } from "../../services";


const registerAlbumController = async (req: Request, res: Response) => {

    const dataAlbum: IAlbumRequest = req.body
    const newAlbum = await registerAlbumService(dataAlbum, req.user)

    return res.status(201).json(newAlbum)

}


export default registerAlbumController