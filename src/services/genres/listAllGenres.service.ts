import AppDataSource from "../../data-source"
import { Genres } from "../../entities/genres.entities"
import { IGenreResponse } from "../../interfaces/genres"
import { listGenresResponseSerializer } from "../../serializers/genres"

const listAllGenresService = async (): Promise <IGenreResponse[]> => {
    
    const genresRepository =  AppDataSource.getRepository(Genres)

    const listAllGenres =  await genresRepository.find()

    const returnedData =  await listGenresResponseSerializer.validate(
        listAllGenres,
        {
            stripUnknown: true
        }
    )

    return returnedData!
}

export default listAllGenresService;