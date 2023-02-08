const request = require("supertest");
const app = require("./index");

describe("POST /", () => {
  it("Responds with success status code and an AI-generated message for a valid request", async () => {
    const response = await request(app).post("/").send({
      message: "Hello, how are you?",
      temperature: 0.5,
      model: "text-davinci-003",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});
