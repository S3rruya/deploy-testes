import { Genres } from "../../entities/genres.entities"
import { Users } from "../../entities/users.entities"
import { IGenreResponse } from "../genres"
import { IUserResponseSimplified } from "../users"

interface IMusicRequest {
    name: string
    duration: string
    genreId: string
    featsId?: string[]
}

interface IMusicResponse {
    id: string
    name: string
    duration: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    performer: IUserResponseSimplified
    feats?: IUserResponseSimplified[]
    genre: IGenreResponse
}

interface IMusicPatchRequest {
    name?: string
    genreId?: string
}

interface IMusicPatchResponse {
    name: string
    duration: string
    createdAt: Date
    updatedAt: Date
    performer: IUserResponseSimplified
    genre: IGenreResponse
}

interface IMusicByAlbumOrPlaylistResponse {
    id: string
    name: string
    duration: string
}

interface IMusicResponseSimples {
    id: string
    name: string
}

export {
    IMusicRequest,
    IMusicResponse,
    IMusicPatchRequest,
    IMusicByAlbumOrPlaylistResponse,
    IMusicPatchResponse,
    IMusicResponseSimples
}