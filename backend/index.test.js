const request = require("supertest");
const app = require("./index");

describe("POST /", () => {
  it("Responds with 401 Unauthorized when API key is missing", async () => {
    const response = await request(app).post("/");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });

  it("Responds with 200 and an AI-generated message when API key is valid", async () => {
    const response = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${process.env.MY_API_KEY}`)
      .send({ message: "Hello, how are you?", temperature: 0.5 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});
