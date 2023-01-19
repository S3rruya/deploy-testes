import AppDataSource from "../../data-source";
import { Playlists } from "../../entities/playlists.entities";
import { IPlaylistsResponse } from "../../interfaces/playlists";
import { listPlaylistsResponseArray } from "../../serializers/playlists";

const listAllPlaylistsService = async (): Promise<IPlaylistsResponse[]> => {
    const playlistRepository =  AppDataSource.getRepository(Playlists)

    const listPlaylists = await playlistRepository.find({
        relations: {
            musics: true,
            user: true
        }
    })
    
    const playlists = await listPlaylistsResponseArray.validate(listPlaylists, {
        stripUnknown:true
    })
    
    return playlists!
} 
export default listAllPlaylistsService;