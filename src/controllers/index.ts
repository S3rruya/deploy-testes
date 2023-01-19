import deleteUserController from "./users/deleteUser.controller";
import registerUserController from "./users/registerUser.controller";
import listAllPerformersController from "./users/listAllPerformers.controller";
import listUserController from "./users/listUser.controller";
import listAllUsersController from "./users/listAllUsers.controller";
import patchUserController from "./users/patchUsers.controller";
import reactivateUsersController from "./users/reactivateUsers.controller";
import createloginController from "./login/login.controller";
import listUniqueGenreController from "./genres/listUniqueGenre.controller";
import listAllMusicsByGenrerController from "./musics/listAllMusicsByGenrer.controller";
import listAllMusicsController from "./musics/listAllMusics.controller";
import listUniqueMusicController from "./musics/listUniqueMusic.controller";
import musicsPostController from "./musics/musicsPost.controller";
import deleteMusicController from "./musics/deleteMusic.controller";
import listAllMusicsByPerformerController from "./musics/listAllMusicsByPerformer.controller";
import registerAlbumController from "./albums/registerAlbums.controller";
import patchMusicsController from "./musics/patchMusic.controller";
import listAlbumController from "./albums/listAlbum.controller";
import addMusicToAlbumsController from "./albums/addMusicAlbums.controller";
import patchAlbumController from "./albums/patchAlbums.controller";
import removeMusicFromAlbumController from "./albums/removeMusicAlbum.controller";
import deleteAlbumController from "./albums/deleteAlbum.controller";
import listAllAlbumsByPerformerController from "./albums/listAllAlbumsByPerformer.controller";
import listAllPlaylistsController from "./playlists/listAllPlaylists.controller";
import listUniquePlaylistController from "./playlists/listUniquePlaylist.controller";
import listUserPlaylistController from "./playlists/listUserPlaylist.controller";
import patchPlaylistsController from "./playlists/patchPlaylists.controller";
import deletePlaylistController from "./playlists/deletePlaylist.controller";
import addMusicsToPlaylistController from "./playlists/addMusicsToPlaylist.controller";
import removeMusicsFromPlaylistController from "./playlists/removeMusicsFromPlaylist.controller";

export {
	registerUserController,
	listAllPerformersController,
	listAllUsersController,
	deleteUserController,
	listUserController,
	patchUserController,
	reactivateUsersController,
	createloginController,
	listUniqueGenreController,
	listAllMusicsByGenrerController,
	deleteMusicController,
	listAllMusicsByPerformerController,
	listAllMusicsController,
	listUniqueMusicController,
	registerAlbumController,
	musicsPostController,
	patchMusicsController,
	removeMusicFromAlbumController,
	listAlbumController,
	addMusicToAlbumsController,
	patchAlbumController,
	deleteAlbumController,
	listAllAlbumsByPerformerController,
	listAllPlaylistsController,
	listUniquePlaylistController,
	listUserPlaylistController,
	patchPlaylistsController,
	deletePlaylistController,
	addMusicsToPlaylistController,
	removeMusicsFromPlaylistController
	
};
