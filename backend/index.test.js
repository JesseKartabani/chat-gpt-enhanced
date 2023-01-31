const request = require("supertest");
const app = require("./index");

jest.setTimeout(6000);

describe("Backend", () => {
  test("AI responds with a completion message", async () => {
    const res = await request(app)
      .post("/")
      .send({ message: "What is the meaning of life?", temperature: 0.5 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: expect.any(String) });
  });
});
