import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";

const deleteMusicService = async (musicId: string): Promise<null> => {

    const musicRepository = AppDataSource.getRepository(Musics)

    const music = await musicRepository.findOneBy({
        id: musicId
    })

    music!.isActive = false
    await musicRepository.save(music!)

    return null

}

export default deleteMusicService;