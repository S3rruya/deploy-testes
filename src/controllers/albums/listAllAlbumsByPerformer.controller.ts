import { Request, Response } from "express";
import { listAllAlbumsByPerformerService } from "../../services";

const listAllAlbumsByPerformerController = async (req:Request, res:Response) =>{
    const performerId:string = req.params.id
    const albumsByPerformer = await listAllAlbumsByPerformerService(performerId)
    return res.status(200).json(albumsByPerformer)
}

export default listAllAlbumsByPerformerController