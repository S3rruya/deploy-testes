import { Request, Response } from "express";
import {listUniqueGenreService} from "../../services"


const listUniqueGenreController = async (req: Request, res: Response) => {
    const paramsData: string = req.params.data
    const genre = await listUniqueGenreService(paramsData)
    return res.status(200).json(genre)
}

export default listUniqueGenreController
