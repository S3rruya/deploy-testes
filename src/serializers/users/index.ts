import * as yup from "yup";
import { SchemaOf } from "yup";
import { IMusicRequest } from "../../interfaces/musics";
import { IUserLogin, IUserMusicsResponse, IUserPatchRequest, IUserPlaylistResponse, IUserRequest, IUserResponse } from "../../interfaces/users";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isPerformer: yup.boolean().required(),
})

const userRegisterResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isAdmin: yup.boolean().required(),
    isActive: yup.boolean().required(),
    isPerformer: yup.boolean().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required(),
  })

const listUsersResponseSerializer: SchemaOf<IUserResponse[]> = yup.array(
  userRegisterResponseSerializer
)

const userPatchRequestSerializer: SchemaOf<IUserPatchRequest> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().notRequired(),
  password: yup.string().notRequired(),
  isPerformer: yup.boolean().notRequired()
})

const loginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
})

const performerMusicsResponseSerializer: SchemaOf<IUserMusicsResponse> = yup.object().shape({
  musics: yup.array().of(
    yup.object({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
      duration: yup.string().notRequired(),
    })
  ).notRequired(),
  updatedAt: yup.date().required(),
  createdAt: yup.date().required(),
  isActive: yup.boolean().required(),
  name: yup.string().required(),
  id: yup.string().required(),
})

export { userSerializer, userRegisterResponseSerializer, listUsersResponseSerializer, userPatchRequestSerializer, loginSerializer, performerMusicsResponseSerializer };
