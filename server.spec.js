const server = require("./server.js");
const request = require("supertest");

const dbHelper = require("./data/dataHelpers.js");
beforeEach(() => {
  return dbHelper.truncate();
});

describe("server", () => {
  it("it should start testing enviornment", () => {
    const env = process.env.DB_ENV;
    expect(env).toBe("testing");
  });

  describe("GET/", () => {
    it("its should return status 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });

  it("it should return JSON", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  it("should return {api:'up and running'}", async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: 'up and running' });
  });

  describe("The insert function", () => {
    beforeEach(() => {
      return dbHelper.truncate();
    });

    it("it should insert a winery in the db", async () => {
      //console.log("Insert...");
      const id = await dbHelper.insert({ winery_name: "Lauren Ridge" });

      //console.log("Inserted...", id);
      const winery = await dbHelper.find();

      expect(winery.length).toBe(1);
      expect(winery[0].winery_name).toBe("Lauren Ridge");
    });

    it("should return the inserted winery with id", async () => {
      const winery = await dbHelper.insert({ winery_name: "Ladybird Winery" });

      expect(winery.winery_name).toBe("Ladybird Winery");
      expect(winery.id).toBe(1);
    });

    it("should give GET All", async () => {
      console.log("should give GET All");
      const wineries = await dbHelper.insert({ winery_name: "Glen Ellen" });

      const wineries2 = await dbHelper.insert({ winery_name: "Korbel" });
      const wineries3 = await dbHelper.find();
      expect(wineries3.length).toBe(2);
    });
  });

  it("should delete the inserted winery", async () => {
    const winery = await dbHelper.insert({ winery_name: "Cline" });

    await dbHelper.remove(winery.id);
    const winery2 = await dbHelper.findBy(winery.id);

    expect(winery2.length).toBe(0);
  });
 });