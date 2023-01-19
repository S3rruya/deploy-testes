import { Router } from "express";
import { listAllMusicsByGenrerController, deleteMusicController, listAllMusicsByPerformerController, musicsPostController, listUniqueMusicController, listAllMusicsController, patchMusicsController } from "../../controllers";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureExistsGenreMiddleware, ensureMusicIdIsValidMiddleware, ensureMusicNameNotExistsMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { musicPatchRequestSerializer, musicsRequestSerializer } from "../../serializers/musics";

const musicsRoutes = Router();

musicsRoutes.post(
    "",
    ensureAuthMiddleware,
    ensureAuthIsPerformerMiddleware,
    ensureDataIsValidMiddleware(musicsRequestSerializer),
    ensureMusicNameNotExistsMiddleware,
    musicsPostController
)
musicsRoutes.get("", listAllMusicsController)
musicsRoutes.get("/performer/:id", ensureUUIDIsValidMiddleware,  listAllMusicsByPerformerController)
musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)
musicsRoutes.get("/:id", ensureUUIDIsValidMiddleware, listUniqueMusicController)
musicsRoutes.delete("/:id",ensureAuthMiddleware, ensureUUIDIsValidMiddleware, ensureAuthIsAdmOrOwnerMiddleware, deleteMusicController)
musicsRoutes.patch("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware, ensureDataIsValidMiddleware(musicPatchRequestSerializer),ensureMusicIdIsValidMiddleware,ensureUUIDIsValidMiddleware,ensureAuthIsAdmOrOwnerMiddleware,ensureAuthIsPerformerMiddleware,patchMusicsController)

export default musicsRoutes;