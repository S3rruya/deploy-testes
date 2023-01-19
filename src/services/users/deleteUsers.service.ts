import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IUserResponse } from "../../interfaces/users";


const deleteUserService =  async (userId: string): Promise <null> => {

    const userRepository =  AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        id: userId
    })

    user!.isActive = false
    await userRepository.save(user!)

    return null

}

export default deleteUserService;