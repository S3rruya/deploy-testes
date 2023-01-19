import { Request, Response } from "express";
import { patchAlbumService } from "../../services";

const patchAlbumController = async (req: Request, res: Response) => {
    const data = await patchAlbumService(req);

    return res.status(200).json(data);
}

export default patchAlbumController;