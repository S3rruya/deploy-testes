import AppDataSource from "../../data-source";
import { Genres } from "../../entities/genres.entities";
import { IGenreRequest, IGenreResponse } from "../../interfaces/genres";

const genrePostService = async (data: IGenreRequest): Promise <IGenreResponse> => {
    const body = data;
    const genreRepo = AppDataSource.getRepository(Genres);
    const genre = genreRepo.create(body);
    const response = await genreRepo.save(genre);

    return response;
}

export default genrePostService;