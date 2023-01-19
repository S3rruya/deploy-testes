
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedAdminLogin, mockedAdminRegister, mockedGenrePost, mockedUserLogin, mockedUserRegister } from "../../mocks"
import { Users } from "../../../entities/users.entities"
import { Genres } from "../../../entities/genres.entities"



describe("/genre", () => {
    let connection: DataSource;
    let genresRepo: Repository<Genres>;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
            genresRepo = connection.getRepository(Genres);
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    })

    beforeEach(async () => {
        const genres = await genresRepo.find();
        await genresRepo.remove(genres);
      });

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /genres - should be able to create genre being admin", async () => {
        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post("/genres").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)
        expect(response.body.name).toEqual("forrozim")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(201)
    })

    test("POST /genres - should not be able to create genre not being admin", async () => {
        await request(app).post("/users").send(mockedUserRegister)
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
   
        const response = await request(app).post("/genres").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })


    test("GET /genres - should be able to list all genres", async ()=> {
        const createUserAdmim = await request(app).post("/admim").send(mockedAdminRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedAdminRegister);

        await request(app).post("/genres").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)

        const response = await request(app).get("/genres")

        expect(response.body).toHaveLength(1)
    })

    test("GET /genres - should be able to list a genre by id", async ()=> {
        const createUserAdmim = await request(app).post("/admim").send(mockedAdminRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedAdminRegister);

        const genreData = await request(app).post(`/genres/`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)

        const response = await request(app).get(`/genres/${genreData.body.id}`)


        expect(response.body.name).toEqual("forrozim")
        expect(response.body).toHaveProperty("id")
    })
    
    test("GET /genres - should be able to list a genre by name", async ()=> {
        const createUserAdmim = await request(app).post("/admim").send(mockedAdminRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedAdminRegister);

        const genreData = await request(app).post(`/genres/`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)

        const response = await request(app).get(`/genres/forrozim`)

        expect(response.body.name).toEqual("forrozim")
        expect(response.body).toHaveProperty("id")
    })
})