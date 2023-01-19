import { Request, Response } from "express";
import { addMusicsToPlaylistService } from "../../services";

const addMusicsToPlaylistController = async (req: Request, res: Response) => {
    const response = await addMusicsToPlaylistService(req);

    return res.status(201).json(response);
}

export default addMusicsToPlaylistController;