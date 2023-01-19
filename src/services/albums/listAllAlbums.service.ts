import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { IAlbumResponse } from "../../interfaces/albums"
import { listAlbumResponseArray } from "../../serializers/albums"

const listAllAlbumsService = async (): Promise<IAlbumResponse[]> => {
    const albumRepository = AppDataSource.getRepository(Albums)

    const listAlbums = await albumRepository.find({
        relations: {
            musics: true,
            performer: true
        },
        order: {
            isActive: 'desc'
        }
    })

    const returnedData = await listAlbumResponseArray.validate(listAlbums,
        {
            stripUnknown: true
        }
    )

    return returnedData!
}

export default listAllAlbumsService