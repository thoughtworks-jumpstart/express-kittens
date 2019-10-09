const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const Kitten = require("../models/Kitten");
const {MongoMemoryServer} = require("mongodb-memory-server");

describe("kittens", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();

      mongoose.set("useNewUrlParser", true);
      mongoose.set("useFindAndModify", false);
      mongoose.set("useCreateIndex", true);
      mongoose.set("useUnifiedTopology", true);

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
    const kittens = [
      {name: "Fluffy", age: 5, sex: "male"},
      {name: "Muffin", age: 3, sex: "female"},
      {name: "Waffle", age: 7, sex: "female"}
    ];
    await Kitten.create(kittens);
  });

  describe("[GET] /kittens", () => {
    it("gets all kittens", () => {
      const expectedKittens = [
        {name: "fluffy", age: 5, sex: "male"},
        {name: "muffin", age: 3, sex: "female"},
        {name: "waffle", age: 7, sex: "female"}
      ];

      return request(app)
        .get("/kittens")
        .expect(200)
        .expect(({body: actualKittens}) => {
          expectedKittens.forEach((kitten, index) => {
            expect(actualKittens[index]).toEqual(
              expect.objectContaining(kitten)
            );
          });
        });
    });
  });
});
