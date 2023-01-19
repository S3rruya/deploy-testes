import AppDataSource from "../../data-source";
import { Genres } from "../../entities/genres.entities";
import { validate } from "uuid"
import { AppError } from "../../errors";
import { IGenreResponse } from "../../interfaces/genres";

const listUniqueGenreService = async (paramsData: string): Promise<IGenreResponse> => {
    const genreRepo = AppDataSource.getRepository(Genres)
    
    if(validate(paramsData)){
        const genre = await genreRepo.findOneBy({ id: paramsData })

        if(!genre){
            throw new AppError("Genre not found", 404)
        }

        return genre 
        
    }

    const genre = await genreRepo.findOneBy({name: paramsData})

    if(!genre){
        throw new AppError("Genre not found", 404)
    }

    return genre

};

export default listUniqueGenreService;
