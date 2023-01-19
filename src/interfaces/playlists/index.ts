import { IMusicResponseSimples } from "../musics"
import { IUserPlaylistResponse, IUserResponseSimplified } from "../users"

interface IPlaylistRequest {
    name: string
}

interface IPlaylistsResponse {
    id: string,
    name: string,
    duration: string,
    createdAt: Date,
    user: IUserResponseSimplified,
    musics?: IMusicResponseSimples[],
    updatedAt: Date
}

interface IPlaylistsUserResponse {
    id: string,
    name: string,
    playlists?: IUserPlaylistResponse[]
}

interface IPlaylistAddOrRemoveMusicRequest {
    id: string
}

export {
    IPlaylistRequest,
    IPlaylistsResponse,
    IPlaylistsUserResponse,
    IPlaylistAddOrRemoveMusicRequest
}