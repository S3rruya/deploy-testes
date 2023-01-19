import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";
import { IAlbumRequest, IAlbumResponse } from "../../interfaces/albums";
import { IUserResponse } from "../../interfaces/users";
import { resgisterAlbumResponse } from "../../serializers/albums";


const registerAlbumService = async (albumData: IAlbumRequest, performer: IUserResponse): Promise<IAlbumResponse> => {

    const albumRepository = AppDataSource.getRepository(Albums)

    const newAlbum = {
        ...albumData,
        performer,
        duration: "00:00:00"
    }
    const createAlbum = albumRepository.create(newAlbum)
    createAlbum.duration = "00:00:00"
    await albumRepository.save(createAlbum)

    const returnedData = resgisterAlbumResponse.validate(createAlbum, {stripUnknown: true})


    return returnedData

}


export default registerAlbumService