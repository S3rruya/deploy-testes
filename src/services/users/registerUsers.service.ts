import { ILike } from "typeorm";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const registerUserService = async (usersData: IUserRequest): Promise<IUserResponse> => {

  const userRepository = AppDataSource.getRepository(Users)

  const userExist = await userRepository.findOne({
    where: { email: ILike(`${usersData.email}`) },
  })

  if (userExist) {
    if (!userExist.isActive) {
      throw new AppError("User disabled", 409)
    }
    throw new AppError("Already exists", 409)
  }

  const createdUser = userRepository.create(usersData)

  await userRepository.save(createdUser)

  const returnedData = await userRegisterResponseSerializer.validate(
    createdUser,
    {
      stripUnknown: true,
    }
  )

  return returnedData

}

export default registerUserService;
