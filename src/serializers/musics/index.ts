import * as yup from "yup";
import { SchemaOf } from "yup";
import { IMusicPatchRequest, IMusicPatchResponse, IMusicRequest, IMusicResponse } from "../../interfaces/musics";

const musicsRequestSerializer: SchemaOf<IMusicRequest> = yup.object().shape({
    name: yup.string().required(),
    duration: yup.string().required(),
    genreId: yup.string().required(),
    featsId: yup.array().notRequired()
})

const musicsResponseSerializer: SchemaOf<IMusicResponse> = yup.object().shape({
    genre: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    feats: yup.array().of(
        yup.object({
            id: yup.string().required(),
            name: yup.string().required(),
        }).notRequired()
    ).notRequired(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isActive: yup.boolean().required(),
    duration: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),    
}) 

const listMusicsResponseArray: SchemaOf<IMusicResponse[]> = yup.array(
    musicsResponseSerializer
)

const musicPatchSerializer: SchemaOf<IMusicPatchResponse> = yup.object().shape({
    genre: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    isActive: yup.boolean().required(),
    duration: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required()
})

const musicPatchRequestSerializer: SchemaOf<IMusicPatchRequest> = yup.object().shape({
    id:yup.string().notRequired(),
    name: yup.string().notRequired(),
    duration: yup.string().notRequired(),
    performerId: yup.string().notRequired(),
    genreId: yup.string().notRequired(),
    featsId: yup.array().notRequired()
})

export {
    musicsResponseSerializer,
    musicsRequestSerializer,
    musicPatchSerializer,
    musicPatchRequestSerializer,
    listMusicsResponseArray
}