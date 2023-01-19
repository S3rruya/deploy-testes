import AppDataSource from "../../data-source"
import { Musics } from "../../entities/musics.entities"
import { IMusicResponse } from "../../interfaces/musics";
import { listMusicsResponseArray } from "../../serializers/musics";

const listAllMusicsService = async (): Promise<IMusicResponse[]> => {
    const musicRepo = AppDataSource.getRepository(Musics)

    const musicsList = await musicRepo.find({
        relations: {
            performer: true,
            feats: true,
            genre: true
        },
        order: {
            isActive: 'desc'
        }
    });
    const response = await listMusicsResponseArray.validate(musicsList, { stripUnknown: true });

    return response!
}

export default listAllMusicsService