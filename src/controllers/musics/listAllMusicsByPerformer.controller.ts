import { Request, Response } from "express";
import { listAllMusicsByPerformerService } from "../../services";


const listAllMusicsByPerformerController =async (req:Request, res: Response) => {
    const performerData:string = req.params.id
    const musicsByPerformer = await listAllMusicsByPerformerService(performerData)
    return res.status(200).json(musicsByPerformer)
}

export default listAllMusicsByPerformerController