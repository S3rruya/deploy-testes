import { DataSource, Repository } from "typeorm";
import request from "supertest"
import AppDataSource from "../../../data-source";
import { mockedPerformerLogin, mockedPerformerRegister, mockedUserLogin, mockedUserRegister } from "../../mocks/integration";
import  app from "../../../app";
import { Users } from "../../../entities/users.entities";



describe("/login", () => {
    const baseUrl: string = "/login";
    let connection: DataSource;
    let userRepo: Repository<Users>;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUserRegister)
        await request(app).post('/users').send(mockedPerformerRegister)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /login -  should be able to login with the normal user",async () => {
        const response = await request(app).post(baseUrl).send(mockedUserLogin);
        
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    })

    test("POST /login -  should be able to login with the performer user",async () => {
        const response = await request(app).post(baseUrl).send(mockedPerformerLogin);
        
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    })
    test("POST /login -  should not be able to login with the user with incorrect password or email",async () => {
        const response = await request(app).post("/login").send({
            email: "schmitao@mai.com",
            password: "1234567"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

})