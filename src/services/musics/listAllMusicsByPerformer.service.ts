import AppDataSource from "../../data-source"
import { Musics } from "../../entities/musics.entities"
import { Users } from "../../entities/users.entities"
import { IUserMusicsResponse } from "../../interfaces/users"
import { performerMusicsResponseSerializer } from "../../serializers/users"

const listAllMusicsByPerformerService = async (performerId: string): Promise<IUserMusicsResponse> => {
    const performerRepository = AppDataSource.getRepository(Users)
    const musicsRepository = AppDataSource.getRepository(Musics)

    const performer = await performerRepository.findOne({
        where: {
            id: performerId
        },
        relations: {
            musics: true
        },
    })

    const response = await performerMusicsResponseSerializer.validate(performer, { stripUnknown: true })

    return response!
}

export default listAllMusicsByPerformerService