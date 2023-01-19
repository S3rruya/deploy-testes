import { Router } from "express";
import {listAlbumController, addMusicToAlbumsController, registerAlbumController, patchAlbumController, listAllAlbumsByPerformerController, deleteAlbumController, removeMusicFromAlbumController } from "../../controllers";
import listAllAlbumsController from "../../controllers/albums/listAllAlbums.controller";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsAdmOrOwnerProvidedMiddleware, ensureUUIDIsValidMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureUserToBeSearchedIsPerformerMiddleware, ensureAlbumIdIsValidMiddleware } from "../../middlewares";
import { albumPostSerializer } from "../../serializers/albums";


const albumsRoutes = Router();

albumsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer), registerAlbumController)
albumsRoutes.get("", listAllAlbumsController)
albumsRoutes.get("/:id", ensureUUIDIsValidMiddleware,ensureAlbumIdIsValidMiddleware ,listAlbumController)
albumsRoutes.get("/performer/:id",ensureUUIDIsValidMiddleware, ensureUserToBeSearchedIsPerformerMiddleware, listAllAlbumsByPerformerController )
albumsRoutes.post("/add/:id", ensureAuthMiddleware,ensureUUIDIsValidMiddleware,ensureAuthIsPerformerMiddleware,ensureAuthIsAdmOrOwnerProvidedMiddleware,addMusicToAlbumsController)
albumsRoutes.patch("/:id", ensureAuthMiddleware,ensureUUIDIsValidMiddleware,ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer) ,patchAlbumController)
albumsRoutes.delete("/remove/:id", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureUUIDIsValidMiddleware, ensureAuthIsAdmOrOwnerProvidedMiddleware,removeMusicFromAlbumController)
albumsRoutes.delete("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware, deleteAlbumController)

export default albumsRoutes;