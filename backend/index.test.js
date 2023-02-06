const request = require("supertest");
const app = require("./index");

describe("POST /", () => {
  it("Responds with 200 and an AI-generated message when API key is valid", async () => {
    const response = await request(app)
      .post("/")
      .send({ message: "Hello, how are you?", temperature: 0.5 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});
