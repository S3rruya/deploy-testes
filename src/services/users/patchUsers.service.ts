import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IUserPatchRequest, IUserResponse } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const patchUserService = async (userDataUpdated: IUserPatchRequest, userData: IUserResponse): Promise<IUserResponse> => {
    
    const userPatch = userDataUpdated
    if(userPatch.password){
        userPatch.password = hashSync(userPatch.password, 10)
    }
    const userRepo = AppDataSource.getRepository(Users)

    const newUser = userRepo.create({
        ...userData,
        ...userPatch
    })

    const user = await userRepo.save(newUser)

    

    const returnedData = await userRegisterResponseSerializer.validate(user, {
        stripUnknown: true
    })

    return returnedData
    
}

export default patchUserService;