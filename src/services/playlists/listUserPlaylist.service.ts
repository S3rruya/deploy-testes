import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IPlaylistsUserResponse } from "../../interfaces/playlists";
import { listAllPlaylistsByUser } from "../../serializers/playlists";

const listUserPlaylistService = async (userId: string): Promise<IPlaylistsUserResponse> => {

    const userRepository = AppDataSource.getRepository(Users)

    const listPlaylist = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            playlists: {
                musics: true
            }
        }
    })
    const playlist = await listAllPlaylistsByUser.validate(listPlaylist, {
        stripUnknown: true
    })

    return playlist
}
export default listUserPlaylistService;