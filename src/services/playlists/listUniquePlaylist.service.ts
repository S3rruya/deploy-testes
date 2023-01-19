
import { Playlists } from "../../entities/playlists.entities"
import { IPlaylistsResponse } from "../../interfaces/playlists"
import {listAllPlaylistsSerializer} from "../../serializers/playlists"

const listUniquePlaylistService = async (foundedPlaylist: Playlists): Promise<IPlaylistsResponse> => {

    

    const playlistResponse = await listAllPlaylistsSerializer.validate(foundedPlaylist, {
        stripUnknown: true
    })

    return playlistResponse

    
}

export default listUniquePlaylistService