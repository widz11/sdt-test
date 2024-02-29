import request from "supertest";
jest.useFakeTimers()

const url = "http://localhost:3000";
let userPayload = {
    id: 1,
    email: `user${Math.random() * 100}@example.com`,
    first_name: "John",
    last_name: "Smith",
    dob: "1990-02-28",
    timezone: "Asia/Jakarta"
}
describe("GET /v1/user", () => {
    it("should return all users", async () => {
        return request(url)
            .get(`/v1/user`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const response = res.body;
                const data = response.data;
                expect(res.statusCode).toBe(200);
                expect(Array.isArray(data)).toBe(true);
            })
    });
});

describe("POST /v1/user", () => {
    it("create user", async () => {
        return request(url)
            .post("/v1/user")
            .send(userPayload)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const response = res.body;
                const data = response.data;
                userPayload.id = data.id
                expect(res.statusCode).toBe(200);
                expect(data.email).toBe(userPayload.email);
                expect(data.first_name).toBe(userPayload.first_name);
                expect(data.last_name).toBe(userPayload.last_name);
                expect(data.dob).toBe(userPayload.dob);
            })
    });
});

describe("PUT /v1/user", () => {
    it("Update user", async () => {
        return request(url)
            .put("/v1/user")
            .send(userPayload)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const response = res.body;
                const data = response.data;
                expect(res.statusCode).toBe(200);
                expect(data.id).toBe(userPayload.id);
                expect(data.email).toBe(userPayload.email);
                expect(data.first_name).toBe(userPayload.first_name);
                expect(data.last_name).toBe(userPayload.last_name);
                expect(data.dob).toBe(userPayload.dob);
            })
    });
});

describe("DELETE /v1/user", () => {
    it("Delete user", async () => {
        return request(url)
            .delete("/v1/user")
            .send({id: userPayload.id})
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const response = res.body;
                const data = response.data;
                expect(res.statusCode).toBe(200);
                expect(data.id).toBe(userPayload.id);
            })
    });
});