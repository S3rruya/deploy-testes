import AppDataSource from "../../data-source";
import { Playlists } from "../../entities/playlists.entities";
import { IPlaylistRequest, IPlaylistsResponse } from "../../interfaces/playlists"
import { IUserResponse } from "../../interfaces/users"
import { resgisterPlaylistResponse } from "../../serializers/playlists";



const registerPlaylistsService = async (dataPlaylist: IPlaylistRequest, user: IUserResponse): Promise<IPlaylistsResponse> => {

    const playlistRepository = AppDataSource.getRepository(Playlists)

    const newPlaylist = {
        ...dataPlaylist,
        user,
        duration: "00:00:00"
    }

    const createPlaylist = playlistRepository.create(newPlaylist)
    await playlistRepository.save(createPlaylist)

    const retunedData = resgisterPlaylistResponse.validate(createPlaylist, {stripUnknown: true})

    return retunedData
}


export default registerPlaylistsService