import {Request,Response} from 'express'
import { IMusicPatchRequest, IMusicRequest, IMusicResponse } from '../../interfaces/musics'
import { patchMusicService } from '../../services'

const patchMusicsController = async(req:Request, res:Response) => {
    const musicDataUpdated: IMusicPatchRequest = req.body
    const musicData:IMusicResponse = req.providedMusics
    const musicId:string = req.params.id
    const data = await patchMusicService(musicDataUpdated, musicData,musicId)
    return res.status(200).json(data)
}

export default patchMusicsController