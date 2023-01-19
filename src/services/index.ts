import deleteUserService from "./users/deleteUsers.service";
import registerUserService from "./users/registerUsers.service";
import listAllUsersService from "./users/listAllUsers.service";
import listAllPerformersService from "./users/listAllPerformers.service";
import loginService from "./login/login.service";
import patchUserService from "./users/patchUsers.service";
import listUserService from "./users/listUser.service";
import genrePostService from "./genres/genresPost.service";
import reactiveUserService from "./users/reactivateUsers.service";
import listUniqueGenreService from "./genres/listUniqueGenre.service";
import registerAdminService from "./admin/registerAdmin.service";
import listAllMusicsByGenrerService from "./musics/listAllMusicsByGenrer.service";
import listAllMusicsService from "./musics/listAllMusics.service";
import listUniqueMusicService from "./musics/listUniqueMusic.service";
import musicsPostService from "./musics/musicsPost.service";
import deleteMusicService from "./musics/deleteMusic.service";
import listAllMusicsByPerformerService from "./musics/listAllMusicsByPerformer.service";
import registerAlbumService from "./albums/registerAlbums.service";
import patchMusicService from "./musics/patchMusic.service";
import listAlbumService from "./albums/listAlbum.service";
import listAllAlbumsService from "./albums/listAllAlbums.service";
import addMusicsToAlbumService from "./albums/addMusicsToAlbums.service";
import patchAlbumService from "./albums/patchAlbums.service";
import removeMusicFromAlbumService from "./albums/removeMusicsToAlbum.service";
import deleteAlbumService from "./albums/deleteAlbum.service";
import listAllAlbumsByPerformerService from "./albums/listAllAlbumsByPerformer.service";
import registerPlaylistsService from "./playlists/registerPlaylists.service";
import listAllPlaylistsService from "./playlists/listAllPlaylists.service";
import listUniquePlaylistService from "./playlists/listUniquePlaylist.service";
import listUserPlaylistService from "./playlists/listUserPlaylist.service";
import patchPlaylistsService from "./playlists/patchPlaylists.service";
import deletePLaylistService from "./playlists/deletePlaylist.service";
import addMusicsToPlaylistService from "./playlists/addMusicsToPlaylist.service";
import removeMusicsFromPlaylistsService from "./playlists/removeMusicsFromPlaylist.service";

export {
	registerUserService,
	listAllUsersService,
	listAllPerformersService,
	loginService,
	deleteUserService,
	patchUserService,
	listUserService,
	genrePostService,
	reactiveUserService,
	listUniqueGenreService,
	registerAdminService,
	listAllMusicsByGenrerService,
	musicsPostService,
	deleteMusicService,
	listAllMusicsByPerformerService,
	listAllMusicsService,
	listUniqueMusicService,
	registerAlbumService,
	patchMusicService,
	listAlbumService,
	listAllAlbumsService,
	addMusicsToAlbumService,
	patchAlbumService,
	removeMusicFromAlbumService,
	deleteAlbumService,
	listAllAlbumsByPerformerService,
	registerPlaylistsService,
	listAllPlaylistsService,
	listUniquePlaylistService,
	listUserPlaylistService,
	patchPlaylistsService,
	deletePLaylistService,
    addMusicsToPlaylistService,
	removeMusicsFromPlaylistsService
};
