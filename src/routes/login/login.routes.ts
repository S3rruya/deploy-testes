import { Router } from "express";
import { createloginController } from "../../controllers";
import { ensureDataIsValidMiddleware } from "../../middlewares";
import { loginSerializer } from "../../serializers/users";



const loginRoutes = Router()


loginRoutes.post("", ensureDataIsValidMiddleware(loginSerializer),createloginController)


export default loginRoutes;