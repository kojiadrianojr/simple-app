let chai = require("chai");
let chaiHttp = require("chai-http");
let server = "http://localhost:3000/api";

chai.should();
chai.use(chaiHttp);

describe("Authentication", () => {
  describe("Register /auth/register", () => {
    it("should VALIDATE input for register", (done) => {
      const user = {
        name: "test123",
        email: "tes",
        username: "test123",
        password: "test123",
        confirm_password: "test123",
      };

      chai
        .request(server)
        .post("/auth/register")
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property("validation_error");
          done();
        });
    });
    it("should REGISTER a unique User", (done) => {
      const user = {
        name: "test name",
        email: "testemail@email.com",
        username: "testusername",
        password: "testpass123",
        confirm_password: "testpass123",
      };
      chai
        .request(server)
        .post("/auth/register")
        .send(user)
        .end((err, response) => {
          if (response.status === 406) {
            response.should.have.status(406);
            response.body.should.have
              .property("error")
              .to.equal("Username or Email already exist!");
            done();
          }
          if (response.status === 201) {
            response.should.have.status(201);
            response.body.should.have
              .property("msg")
              .to.equal("Registration Complete!");
            done();
          }
        });
    });
  });
  describe("Login /auth/login", () => {
    it("should VALIDATE input for login", (done) => {
      const user = {
        username: "us",
        password: "password",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(user)
        .end((er, response) => {
          response.should.have.status(400);
          response.body.should.have.property("validation_error");
          done();
        });
    });
    it("should LOGIN a user", (done) => {
      const user = {
        username: "testusername",
        password: "testpass123",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("jwt_token");
          response.body.should.have.property("userInfo");
          done();
        });
    });
    it("should check invalid username/password", (done) => {
      const user = {
        username: "invaliduser",
        password: "invalidpass",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("msg")
            .to.equal("Incorrect username/password, please check.");
          done();
        });
    });
  });
  describe("Manage OTP /auth/manage_otp/:id", () => {
    it("should manage otp of user", (done) => {
      const userId = "5f464958fdbbc202a4c15966";
      chai
        .request(server)
        .patch('/auth/manage_otp/' + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("msg");
          done();
        });
    });
  });
});
