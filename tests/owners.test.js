const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const Owner = require("../models/Owner");
const {MongoMemoryServer} = require("mongodb-memory-server");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const contains = expect.objectContaining;

describe("owners", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const owners = [{username: "john", password: "test12345"}];
    await Owner.create(owners);
  });

  afterEach(async () => {
    await Owner.deleteMany();
  });

  describe("[POST] /owners", () => {
    it("adds a new owner", async () => {
      const {body: owner} = await request(app)
        .post("/owners/new")
        .send({username: "bob", password: "test12345"})
        .expect(200);

      expect(owner.username).toBe("bob");
      expect(owner.password).not.toBe("test12345");
    });

    it("logs owner in if password is correct", async () => {
      await request(app)
        .post("/owners/login")
        .send({username: "john", password: "test12345"})
        .expect(200);
    });

    it("does not log owner in if password is incorrect", async () => {
      await request(app)
        .post("/owners/login")
        .send({username: "john", password: "wrongpassword"})
        .expect(400);
    });
  });
});
