import * as yup from "yup";
import { SchemaOf } from "yup";
import { Genres } from "../../entities/genres.entities";
import { IGenreRequest, IGenreResponse } from "../../interfaces/genres";

const genrePostSerializer: SchemaOf<IGenreRequest> = yup.object().shape({
    name: yup.string().required(),
})

const genreResponseSerializer: SchemaOf<IGenreResponse> = yup.object().shape({
    name: yup.string().required(),
    id:yup.string().required(),
})

const listGenresResponseSerializer: SchemaOf<IGenreResponse[]> = yup.array(
    genreResponseSerializer
)

export { genrePostSerializer, listGenresResponseSerializer }