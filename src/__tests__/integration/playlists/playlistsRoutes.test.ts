import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import request from "supertest"
import AppDataSource from "../../../data-source";
import { Playlists } from "../../../entities/playlists.entities"
import { mockedAdminLogin, mockedAdminRegister, mockedAlbumPost, mockedGenrePost, mockedInvalidUUID, mockedPatchAlbum, mockedPerformerLogin, mockedPerformerRegister, mockedPerformerRegisterFake, mockedUserLogin, mockedUserRegister } from "../../mocks";
import { Users } from "../../../entities/users.entities";
import { Musics } from "../../../entities/musics.entities";
import { Genres } from "../../../entities/genres.entities";
import { IMusicRequest } from "../../../interfaces/musics";
import { response } from "express";
import { IPlaylistAddOrRemoveMusicRequest } from "../../../interfaces/playlists";

describe("/playlists", () => {
    let connection: DataSource;
    let playlistsRepo: Repository<Playlists>;
    let userRepo: Repository<Users>;
    let musicsRepo: Repository<Musics>;
    let genreRepo: Repository<Genres>;


    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res
            playlistsRepo = connection.getRepository(Playlists);
            userRepo = connection.getRepository(Users);
            musicsRepo = connection.getRepository(Musics);
            genreRepo = connection.getRepository(Genres);


        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    });


    beforeEach(async () => {
        const musics = await musicsRepo.find();
        await musicsRepo.remove(musics);
        const playlists = await playlistsRepo.find();
        await playlistsRepo.remove(playlists)
        const genres = await genreRepo.find();
        await genreRepo.remove(genres);
        const users = await userRepo.find();
        await userRepo.remove(users)


    });

    afterAll(async () => {
        await connection.destroy()
    });

    test("POST /playlists - should be able to create playlist", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const response = await request(app).post("/playlists").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        expect(response.body.name).toEqual("Festinha na piscina")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("duration")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("user")
        expect(response.body.user.name).toEqual("lucas")
        expect(response.status).toBe(201)
    })

    test("GET /playlists - should be able to list all playlists", async () => {

        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        await request(app).post("/playlists").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        const response = await request(app).get("/playlists").send()

        expect(response.body).toHaveProperty("map")
        expect(response.status).toBe(200)

    })

    test("GET /playlists - should be able to list a unique playlist by id", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const playlist = await request(app).post("/playlists").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        const response = await request(app).get(`/playlists/${playlist.body.id}`).send()

        expect(response.body.id).toEqual(playlist.body.id)
        expect(response.status).toBe(200)

    })

    test("GET /playlists - should not be able to list a unique playlist by invalid UUID", async () => {


        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        await request(app).post("/playlists").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        const response = await request(app).get(`/playlists/${"notUUID"}`).send()

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    test("GET /playlists - should not be able to list a unique playlist by don't exists", async () => {

        const response = await request(app).get(`/playlists/${mockedInvalidUUID}`).send()

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("GET /playlists - should be able to list all playlists of Performer by id", async () => {

        const createUserPerformer = await request(app).post("/users").send(mockedPerformerRegister)


        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        await request(app).post("/playlists").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        const response = await request(app).get(`/playlists/users/${createUserPerformer.body.id}`).send()



        expect(response.body.id).toEqual(createUserPerformer.body.id)
        expect(response.status).toBe(200)

    })

    test("GET /playlists - should not be able to list all playlists of Performer by invalid UUID", async () => {

        const response = await request(app).get(`/playlists/users/${"invalidUUID"}`).send()

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)

    })

    test("POST /playlists - should be able to add music in playlist", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)


        expect(addMusicAlbum.body.musics[0].id).toEqual(idMusicToAdd.id)
        expect(addMusicAlbum.body.musics).toHaveLength(1)
        expect(addMusicAlbum.status).toBe(201)
    });

    test("POST /playlists - should not be able to add Music with invalid Album Id", async () => {

        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)


        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)



        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/playlists/add/${"invalidUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlbum.body).toHaveProperty("message")
        expect(addMusicAlbum.status).toBe(409)
    })

    test("POST /playlists - should not be able to add Music with not exists Album Id", async () => {

        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)


        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)



        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/playlists/add/${"invalidUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlbum.body).toHaveProperty("message")
        expect(addMusicAlbum.status).toBe(409)
    })

    test("POST /playlists - should not be able to add Music with invalid Music Id", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: "invalidUUID"
        }

        const addMusicAlbum = await request(app).post(`/playlists/add/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlbum.body).toHaveProperty("message")
        expect(addMusicAlbum.status).toBe(409)
    })

    test("POST /playlists - should not be able to add Music that already exists", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const addMusicAlreadyAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlreadyAlbum.body).toHaveProperty("message")
        expect(addMusicAlreadyAlbum.status).toBe(409)
    })

    test("POST /playlists - should not be able to add Music without been the Owner", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)
        await request(app).post("/users").send(mockedPerformerRegisterFake)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)
        const userPerfomerResponseFake = await request(app).post("/login").send(mockedUserLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)


        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(idMusicToAdd)


        expect(addMusicAlbum.body).toHaveProperty("message")
        expect(addMusicAlbum.status).toBe(403)
    })

    test("DELETE /playlists - should be able to remove music from playlist", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }
        const addMusicAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const deleteMusicAlbum = await request(app).delete(`/playlists/remove/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const musicAlbum = await request(app).get(`/playlists/${createAlbum.body.id}`).send()



        expect(musicAlbum.body.musics).toHaveLength(0)
        expect(deleteMusicAlbum.status).toBe(204)
    });

    test("DELETE /playlists - should not be able to remove music from playlist with INVALID Album Id", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }
        const addMusicAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const deleteMusicAlbum = await request(app).delete(`/playlists/remove/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const musicAlbum = await request(app).get(`/playlists/${createAlbum.body.id}`).send()



        expect(musicAlbum.body.musics).toHaveLength(1)
        expect(deleteMusicAlbum.body).toHaveProperty("message")
        expect(deleteMusicAlbum.status).toBe(409)
    });

    test("DELETE /playlists - should not be able to remove music from playlist with not exists playlist id", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }
        const addMusicAlbum = await request(app).post(`/playlists/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const deleteMusicAlbum = await request(app).delete(`/playlists/remove/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const musicAlbum = await request(app).get(`/playlists/${createAlbum.body.id}`).send()



        expect(musicAlbum.body.musics).toHaveLength(1)
        expect(deleteMusicAlbum.body).toHaveProperty("message")
        expect(deleteMusicAlbum.status).toBe(409)
    });

    test("DELETE /playlists - should not be able to remove Music without been the Owner", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)
        await request(app).post("/users").send(mockedPerformerRegisterFake)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)
        const userPerfomerResponseFake = await request(app).post("/login").send(mockedUserLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)


        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const removeMusicAlbum = await request(app).delete(`/playlists/remove/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(idMusicToAdd)


        expect(removeMusicAlbum.body).toHaveProperty("message")
        expect(removeMusicAlbum.status).toBe(403)
    })

    test("PATCH /playlists - should be able to change the playlist name", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const changeAlbumName = await request(app).patch(`/playlists/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedPatchAlbum)

        expect(changeAlbumName.body.name).toEqual("Sem Festas Hoje")
        expect(changeAlbumName.status).toBe(200)

    });

    test("PATCH /playlists - should not be able to change the name without the correct Owner", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)
        await request(app).post("/users").send(mockedPerformerRegisterFake)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)
        const userPerfomerResponseFake = await request(app).post("/login").send(mockedUserLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const changeAlbumName = await request(app).patch(`/playlists/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(mockedPatchAlbum)


        expect(changeAlbumName.body).toHaveProperty("message")
        expect(changeAlbumName.status).toBe(403)

    });

    test("PATCH /playlists - should not be able to change playlist name with invalid UUID", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)
        await request(app).post("/users").send(mockedPerformerRegisterFake)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)
        const userPerfomerResponseFake = await request(app).post("/login").send(mockedUserLogin)

        const createAlbum = await request(app).post("/playlists").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const changeAlbumName = await request(app).patch(`/playlists/${"NotUUID"}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(mockedPatchAlbum)


        expect(changeAlbumName.body).toHaveProperty("message")
        expect(changeAlbumName.status).toBe(409)

    });





})