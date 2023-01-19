import { IMusicByAlbumOrPlaylistResponse, IMusicResponse } from "../musics"

interface IUserLogin {
    email: string
    password: string
}

interface IUserRequest {
    name: string
    password: string
    email: string
    isPerformer: boolean
}

interface IUserResponse {
    id: string
    name: string
    email: string
    isPerformer: boolean
    isAdmin: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

interface IUserResponseSimplified {
    id: string
    name: string
}
interface IUserPatchRequest {
    name?: string
    email?: string
    password?: string
    isPerformer?: boolean
}

interface IUserPlaylistResponse {
    id: string,
    name: string,
    duration: string,
    createdAt: string,
    updatedAt: string,
    musics?: IMusicByAlbumOrPlaylistResponse[]
}
interface IUserMusicsResponse {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
    musics?: IMusicByAlbumOrPlaylistResponse[]
}
export {
    IUserLogin,
    IUserRequest,
    IUserResponse,
    IUserPatchRequest,
    IUserResponseSimplified,
    IUserPlaylistResponse,
    IUserMusicsResponse
}