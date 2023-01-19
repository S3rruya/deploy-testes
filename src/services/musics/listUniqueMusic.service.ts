import AppDataSource from "../../data-source"
import { Musics } from "../../entities/musics.entities"
import { IMusicResponse } from "../../interfaces/musics"
import { musicsResponseSerializer } from "../../serializers/musics"

const listUniqueMusicService = async (musicId: string): Promise<IMusicResponse> => {
    const musicsRepo = AppDataSource.getRepository(Musics)

    const music = await musicsRepo.findOne({
        where: {
            id: musicId
        },
        relations: {
            performer: true,
            genre: true
        }
    })
    const response = await musicsResponseSerializer.validate(music, { stripUnknown: true })
    return response!
}

export default listUniqueMusicService