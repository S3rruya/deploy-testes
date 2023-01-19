import exp from "constants"
import request from "supertest"
import { DataSource, Repository } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { Genres } from "../../../entities/genres.entities"
import { Musics } from "../../../entities/musics.entities"
import { Users } from "../../../entities/users.entities"
import { IMusicRequest } from "../../../interfaces/musics"
import { mockedAdminLogin, mockedAdminRegister, mockedGenrePost, mockedPerformerLogin, mockedPerformerRegister, mockedUserLogin, mockedUserRegister } from "../../mocks"


describe("/musics", () => {
    let connection: DataSource
    let musicsRepo: Repository<Musics>
    let genreRepo: Repository<Genres>
    let usersRepo: Repository<Users>

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res
            musicsRepo = connection.getRepository(Musics)
            genreRepo = connection.getRepository(Genres)
            usersRepo = connection.getRepository(Users)
        }).catch((error) => {
            console.error("Error during Data Source initialization", error)
        })
    })

    beforeEach(async () => {
        const musics = await musicsRepo.find()
        const genres = await genreRepo.find()
        const users = await usersRepo.find()
        await musicsRepo.remove(musics)
        await genreRepo.remove(genres)
        await usersRepo.remove(users)
    })

    afterAll(async () => {
        await connection.destroy()
    })


    test("POST User must be able to create a music", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)


        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const response = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)

        expect(response.body.name).toEqual("João Pedro mais conhecido como bola de fogo")
        expect(response.body.duration).toEqual("10:15")
        expect(response.body).toHaveProperty("genre")
        expect(response.body).toHaveProperty("feats")
        expect(response.status).toBe(201)
    })

    test("POST User should not be able to create a music without authorization", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const register = await request(app).post("/users").send(mockedPerformerRegister)


        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const response = await request(app).post("/musics").send(musicToBeCreated)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("POST User must be a performer to create a music", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const register = await request(app).post("/users").send(mockedUserRegister)

        const login = await request(app).post("/login").send(mockedUserLogin)


        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const response = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("GET Must be able to list all musics", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)
        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const musicCreated = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)
        const response = await request(app).get("/musics")

        expect(response.body[0].name).toEqual("João Pedro mais conhecido como bola de fogo")
        expect(response.body[0].duration).toEqual("10:15")
        expect(response.body[0]).toHaveProperty("isActive")
        expect(response.body[0]).toHaveProperty("updatedAt")
        expect(response.body[0]).toHaveProperty("createdAt")
        expect(response.status).toBe(200)
    })

    test("GET Must be able to list all musics by performer", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)
        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "00:10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const musicCreated = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)
        const response = await request(app).get(`/musics/performer/${register.body.id}`)
        expect(response.body.name).toEqual("lucas")
        expect(response.body).toHaveProperty("musics")
        expect(response.status).toBe(200)
    })

    test("GET Must be able to list all musics by genre", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)
        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const musicCreated = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)
        const response = await request(app).get(`/musics/genres/${createGenre.body.id}`)

        expect(response.body[0].name).toEqual("João Pedro mais conhecido como bola de fogo")
        expect(response.body[0].duration).toEqual("10:15")
        expect(response.body[0]).toHaveProperty("isActive")
        expect(response.body[0]).toHaveProperty("updatedAt")
        expect(response.body[0]).toHaveProperty("createdAt")
        expect(response.status).toBe(200)
    })


    test("GET Must be able to list a music", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)
        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const musicCreated = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)
        const response = await request(app).get(`/musics/${musicCreated.body.id}`)

        expect(response.body.name).toEqual("João Pedro mais conhecido como bola de fogo")
        expect(response.body.duration).toEqual("10:15")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.status).toBe(200)
    })

    test("GET Must be able to delete a music", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)
        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const musicCreated = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)
        const response = await request(app).delete(`/musics/${musicCreated.body.id}`).set("Authorization", `Bearer ${login.body.token}`)


        expect(response.status).toBe(204)
    })

    test("PATCH Must be able to patch a music", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)
        const register = await request(app).post("/users").send(mockedPerformerRegister)

        const login = await request(app).post("/login").send(mockedPerformerLogin)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const musicCreated = await request(app).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated)

        const musicToBeUpdated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de gelo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const response = await request(app).patch(`/musics/${musicCreated.body.id}`).set("Authorization", `Bearer ${login.body.token}`).send(musicToBeUpdated)

        expect(response.status).toBe(200)
    })
})