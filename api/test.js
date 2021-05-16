const request = require("supertest");
const app = require("./app.js");
describe("No Credentials", () => {
  //Test backend
  afterAll(done => {
    app.close();
    done();
  });
  //Returning right error when no details given
  it("should return an error", async () => {
    const res = await request(app)
      .post("/login")
      .send({});
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Missing Authorization Header");
  }, 20000);
});

let token0 = Buffer.from("randomgarbage", "utf8").toString("base64");
describe("No Credentials in header", () => {
  afterAll(done => {
    app.close();
    done();
  });
    //Returning right error when no credentials given
  it("should return an error", async () => {
    const res = await request(app)
      .post("/login")
      .set("Authorization", "Basic " + token0);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("No username or password in request");
  }, 20000);
});

let token = Buffer.from("username:wrongpassword", "utf8").toString("base64");
describe("Both wrong Credentials", () => {
  afterAll(done => {
    app.close();
    done();
  });
  //Returning right error when both credentials wrong
  it("should return an error", async () => {
    const res = await request(app)
      .post("/login")
      .set("Authorization", "Basic " + token);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Incorrect email or password try again");
  }, 20000);
});

let token2 = Buffer.from(
  "dawnroth@yahoo.com.au:wrongpassword",
  "utf8"
).toString("base64");
describe("Right email wrong password", () => {
  afterAll(done => {
    app.close();
    done();
  });
  //Returning right error when Right email wrong password
  it("should return an error", async () => {
    const res = await request(app)
      .post("/login")
      .set("Authorization", "Basic " + token2);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Incorrect email or password try again");
  }, 20000);
});

let token3 = Buffer.from("username:password", "utf8").toString("base64");
describe("Right password wrong email", () => {
  afterAll(done => {
    app.close();
    done();
  });
  it("should return an error", async () => {
      //Returning right error when Right password wrong email
    const res = await request(app)
      .post("/login")
      .set("Authorization", "Basic " + token3);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Incorrect email or password try again");
  }, 20000);
});

let token4 = Buffer.from("dawnroth@yahoo.com.au:password", "utf8").toString(
  "base64"
);
describe("Right email right password", () => {
  afterAll(done => {
    app.close();
    done();
  });
  it("should return a jwt", async () => {
    //Returning right details (JWT and message) when Right email right password
    const res = await request(app)
      .post("/login")
      .set("Authorization", "Basic " + token4);
    expect(res.statusCode).toEqual(200);
    expect(res.body.Message).toEqual("Success");
    expect(res.body.areas).toMatch("s");
  }, 20000);
});
