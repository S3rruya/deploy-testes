import { Request, Response } from "express";
import { Musics } from "../../entities/musics.entities";
import { IAlbumRequest } from "../../interfaces/albums";
import { addMusicsToAlbumService } from "../../services";

const addMusicToAlbumsController = async(req:Request,res:Response) => {
    
    const albumId:string = req.params.id
    const musicId:string = req.body.id
    const data = await addMusicsToAlbumService(albumId,musicId)

    return res.status(201).json(data)
}

export default addMusicToAlbumsController