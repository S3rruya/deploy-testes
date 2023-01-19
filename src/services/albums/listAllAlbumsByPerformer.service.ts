import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entities"
import { IlistAllAlbumsByPerformerResponse } from "../../interfaces/albums"
import { listAllAlbumsByPerformerSerializer } from "../../serializers/albums"

const listAllAlbumsByPerformerService = async (performerId: string): Promise<IlistAllAlbumsByPerformerResponse> => {
    const user = AppDataSource.getRepository(Users)

    const findAlbums = await user.findOne({
        where: {
            id: performerId
        },
        relations: {
            albums: {
                musics: true
            }

        }
    })

    const responseAlbumsFound = await listAllAlbumsByPerformerSerializer.validate(findAlbums, {
        stripUnknown: true
    })
    return responseAlbumsFound!
}

export default listAllAlbumsByPerformerService