import { compare } from "bcryptjs";
import { ILike } from "typeorm";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { IUserLogin, IUserResponse } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const reactiveUserService = async (userData: IUserLogin): Promise<IUserResponse>=> {

  const userRepository = AppDataSource.getRepository(Users)
  const findUser = await userRepository.findOne({
    withDeleted: true,
    
    where: {

        email: ILike(`${userData.email}`),
    } 
    
  })
  
    if (!findUser) {
        throw new AppError("User not exists", 404)
    }
    
    if(findUser.isActive){
        throw new AppError("User already active", 409)
    }

  const passwordMatch = await compare(userData.password, findUser.password)

  if(!passwordMatch){
      throw new AppError("Email or password invalid", 403)
  }

  findUser.isActive = true

  await userRepository.save(findUser)
  
  const returnedData = await userRegisterResponseSerializer.validate(
    findUser,
    {
      stripUnknown: true,
    }
  )

  return returnedData
  
}

export default reactiveUserService;