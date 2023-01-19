import { Request, Response } from "express";
import listAllGenresService from "../../services/genres/listAllGenres.service";

const listAllGenresController = async (req: Request, res: Response) => {
    const listGenres = await listAllGenresService()
    return res.status(200).json(listGenres)
}
export default listAllGenresController;