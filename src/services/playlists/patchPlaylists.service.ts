import AppDataSource from "../../data-source";
import { Playlists } from "../../entities/playlists.entities";
import { IPlaylistRequest, IPlaylistsResponse } from "../../interfaces/playlists";
import { listAllPlaylistsSerializer } from "../../serializers/playlists";



const patchPlaylistsService = async (bodyPlaylist: IPlaylistRequest, playlist: Playlists): Promise<IPlaylistsResponse> => {

    const playlistRepository = AppDataSource.getRepository(Playlists)

    const newPlaylist = {
        ...playlist,
        ...bodyPlaylist
    }

    const updatePlaylist = playlistRepository.create(newPlaylist)

    await playlistRepository.save(updatePlaylist)

    const returnedData = await listAllPlaylistsSerializer.validate(updatePlaylist, {
        stripUnknown: true
    })

    return returnedData
}


export default patchPlaylistsService