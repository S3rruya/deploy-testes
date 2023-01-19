import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IUserResponse } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const listUserService = async (userId: string): Promise <IUserResponse>=> {
    
    const userRepo = AppDataSource.getRepository(Users)

    const user = await userRepo.findOneBy({id: userId})

    const userResponse = await userRegisterResponseSerializer.validate(user, {
        stripUnknown: true
    })

    return userResponse

}

export default listUserService;