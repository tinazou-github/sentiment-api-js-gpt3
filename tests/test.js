//test.js

const server = require("../main.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Endpoints", () => {
  it("GET /about returns about text", async () => {
    const res = await requestWithSupertest.get("/about");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("text"));
    expect(res.text).toEqual("Thanks for learning more about us.");
  });
});
