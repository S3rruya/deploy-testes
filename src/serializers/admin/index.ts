import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAdminRequest } from "../../interfaces/admin";

const adminRequestSerializer: SchemaOf<IAdminRequest> = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
})

export {
    adminRequestSerializer
}
