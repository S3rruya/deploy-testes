import { Router } from "express";
import { listUniqueGenreController } from "../../controllers";
import genrePostController from "../../controllers/genres/genresPost.controller";
import listAllGenresController from "../../controllers/genres/listAllGenres.controller";
import { ensureAuthAdminMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureGenreNotExistMiddleware } from "../../middlewares";
import { genrePostSerializer } from "../../serializers/genres";

const genresRoutes = Router();

genresRoutes.post(
    "", 
    ensureAuthMiddleware, 
    ensureAuthAdminMiddleware,
    ensureDataIsValidMiddleware(genrePostSerializer),
    ensureGenreNotExistMiddleware,
    genrePostController
)
genresRoutes.get("/:data", listUniqueGenreController)
genresRoutes.get("", listAllGenresController)

export default genresRoutes;