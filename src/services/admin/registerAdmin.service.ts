import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IAdminRequest } from "../../interfaces/admin";
import { IUserResponse } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const registerAdminService = async (adminData: IAdminRequest): Promise<IUserResponse> => {
    const userRepository = AppDataSource.getRepository(Users);
    const createdAdmin = userRepository.create(adminData);
    createdAdmin.isAdmin = true;
    const savedAdmin = await userRepository.save(createdAdmin);
    const response = await userRegisterResponseSerializer.validate(
        savedAdmin,
        {
          stripUnknown: true,
        }
    )
    return response;
}

export default registerAdminService;