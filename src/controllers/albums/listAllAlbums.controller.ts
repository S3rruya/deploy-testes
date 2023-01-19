import { Request, Response } from "express";
import { IAlbumRequest } from "../../interfaces/albums";
import { listAllAlbumsService } from "../../services";


const listAllAlbumsController = async(req:Request,res:Response) => {
    const data = await listAllAlbumsService()
    return res.status(200).json(data)
}

export default listAllAlbumsController