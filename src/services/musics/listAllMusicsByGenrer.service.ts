import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";


const listAllMusicsByGenrerService = async (idGenrer: string): Promise<Musics[]> => {

    const musicRepository = AppDataSource.getRepository(Musics)

    const musics = await musicRepository.createQueryBuilder("musics")
        .innerJoinAndSelect("musics.genre", "genres")
        .where("genres.id = :id_genre", { id_genre: idGenrer })
        .orderBy('musics.isActive', 'DESC')
        .getMany()

    return musics

}
export default listAllMusicsByGenrerService;