import { IMusicByAlbumOrPlaylistResponse } from "../musics"
import { IUserResponseSimplified } from "../users"

interface IAlbumRequest {
    name: string
}

interface IAlbumResponse {
    id: string,
    name: string,
    duration?: string,
    isActive: boolean
    createdAt: Date
    updatedAt: Date

}

interface IlistAlbumResponse {
    id: string,
    name: string,
    duration: string,
    performer: IUserResponseSimplified
    musics: IMusicByAlbumOrPlaylistResponse[]
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}
interface IlistAllAlbumsByPerformerResponse {
    id: string
    name: string
    albums?: IlistAlbumResponse[]
}

export {
    IAlbumRequest,
    IAlbumResponse,
    IlistAlbumResponse,
    IlistAllAlbumsByPerformerResponse
}
