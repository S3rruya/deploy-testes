import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";

const deleteAlbumService = async (albumId: string): Promise<null> => {

    const albumRepo = AppDataSource.getRepository(Albums);

    const album = await albumRepo.findOneBy({ id: albumId });

    album!.isActive = false

    await albumRepo.save(album!);

    return null
};



export default deleteAlbumService;
