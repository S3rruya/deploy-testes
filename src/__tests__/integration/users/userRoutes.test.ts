import { DataSource, Repository } from "typeorm";
import request from "supertest"
import AppDataSource from "../../../data-source";
import { mockedAdminRegister, mockedInactiveRegister, mockedPerformerRegister, mockedUserRegister } from "../../mocks/integration";
import app from "../../../app";
import { Users } from "../../../entities/users.entities";



describe("/users", () => {
  const baseUrl: string = "/users";
  let connection: DataSource;
  let userRepo: Repository<Users>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        connection = dataSource;
        userRepo = connection.getRepository(Users);
      })
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {

    const response = await request(app).post(baseUrl).send(mockedUserRegister)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("isAdmin")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("isPerformer")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.name).toEqual("JP")
    expect(response.body.email).toEqual("jp@mail.com")
    expect(response.body.isAdmin).toEqual(false)
    expect(response.body.isActive).toEqual(true)
    expect(response.body.isPerformer).toEqual(false)
    expect(response.status).toBe(201)
  })

  test("POST /users -  should not be able to create a user that already exists", async () => {
    await request(app).post(baseUrl).send(mockedUserRegister)
    const response = await request(app).post(baseUrl).send(mockedUserRegister)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)

  })

  test("GET /users -  Must be able to list users", async () => {

    await request(app).post(baseUrl).send(mockedPerformerRegister)
    await request(app).post(baseUrl).send(mockedUserRegister)

    const response = await request(app).get(baseUrl)

    expect(response.body).toHaveLength(2)
    expect(response.body[0]).not.toHaveProperty("password")

  })

  test("GET /users/performer -  Must be able to list performers", async () => {

    await request(app).post(baseUrl).send(mockedPerformerRegister)
    await request(app).post(baseUrl).send(mockedUserRegister)

    const response = await request(app).get(`${baseUrl}/performer`)

    expect(response.body).toHaveLength(1)
    expect(response.body[0].isPerformer).toEqual(true)
    expect(response.body[0]).not.toHaveProperty("password")

  })

  test("GET /users/:id -  Must be able to list a user", async () => {

    await request(app).post(baseUrl).send(mockedPerformerRegister)
    const userTobeListed = await request(app).post(baseUrl).send(mockedUserRegister)

    const response = await request(app).get(`${baseUrl}/${userTobeListed.body.id}`)

    expect(response.body.id).toEqual(userTobeListed.body.id)
    expect(response.body.name).toEqual("JP")
    expect(response.body.email).toEqual("jp@mail.com")
    expect(response.body).not.toHaveProperty("password")

  })

  test("PATCH /users/reactivate -  should not be able to reactivate a user that already is Active", async () => {
    await request(app).post(baseUrl).send(mockedInactiveRegister)

    const response = await request(app).patch(`${baseUrl}/reactivate`).send(mockedInactiveRegister)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)

  })

  test("PATCH /users/reactivate -  should not be able to reactivate a user without authentication", async () => {
    const userTobedeleted = await request(app).post(baseUrl).send(mockedInactiveRegister)

    const userLoginResponse = await request(app).post("/login").send(mockedInactiveRegister);
    
    const userDeletado = await request(app).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}s`)
  
    const response = await request(app).patch(`${baseUrl}/reactivate`).send(mockedInactiveRegister)


    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)

  })

  test("PATCH /users/reactivate -  Must be able to reactivate a user", async () => {
    const userTobedeleted = await request(app).post(baseUrl).send(mockedInactiveRegister)

    const userLoginResponse = await request(app).post("/login").send(mockedInactiveRegister);
    
    const userDeletado = await request(app).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  
    const response = await request(app).patch(`${baseUrl}/reactivate`).send(mockedInactiveRegister)

    expect(response.body.name).toEqual("lucas")
    expect(response.body.email).toEqual("schmitao@mail.com")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.isActive).toEqual(true)

  })

  test("DELETE /users/:id -  should not be able to delete a user without authentication", async () => {
    const userTobedeleted = await request(app).post(baseUrl).send(mockedInactiveRegister)

    const userLoginResponse = await request(app).post("/login").send(mockedInactiveRegister);
    
    const response = await request(app).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}s`)
  

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })

  test("DELETE /users/:id -  should not be able to delete a user that is already deleted", async () => {
    const userTobedeleted = await request(app).post(baseUrl).send(mockedInactiveRegister)

    const userLoginResponse = await request(app).post("/login").send(mockedInactiveRegister);
    
    await request(app).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  
    const response = await request(app).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)

  })

  test("DELETE /users/:id -  Must be able to delete a user", async () => {
    const userTobedeleted = await request(app).post(baseUrl).send(mockedInactiveRegister)

    const userLoginResponse = await request(app).post("/login").send(mockedInactiveRegister);
    
    const response = await request(app).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  

    expect(response.status).toBe(204)

  })

})