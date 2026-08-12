const request = require("supertest");
const app = require("../app");

describe("Health API", () => {
  it("should return API health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("statusCode", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Clear Skin API is running"
    );
  });
});