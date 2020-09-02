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
  describe("Manage OTP", () => {
    it("should manage otp of user", (done) => {
      const userId = "5f4f805a53ff5602b5b45411";
      chai
        .request(server)
        .patch("/auth/manage_otp/" + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("msg");
          done();
        });
    });
    it("should validate otp", (done) => {
      const userId = "5f464958fdbbc202a4c15966";
      const user = {
        username: "testusername",
        password: "testpass123",
      };
      const token = "";
      chai
        .request(server)
        .post("/auth/login")
        .send(user)
        .end((err, response) => {
          if (response.body.userInfo.otp_enabled === true) {
            return chai
              .request(server)
              .post("/auth/validate_otp/" + response.body.userInfo.id)
              .send(token)
              .end((err, response) => {
                response.body.should.have.property("otp_granted");
                done();
              });
          } else {
            done();
          }
        });
    });
    it("should generate otp", (done) => {
      const userId = "5f4e23ef9ef66301f4269d8d";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTkwNTA3MDIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJwYXNzd29yZCI6InBhc3MxMjMiLCJpYXQiOjE1OTkwNDcxMDJ9.f7km-0BKu2x8Egmo6_se45CYO2fI-2hrW9M5LpkcdUY";
      chai
        .request(server)
        .get("/auth/generate_otp/" + userId)
        .set({
          Authorization:
            "bearer " + token,
        })
        .end((err, response) => {
          response.body.should.have.property("msg").to.equal("OTP Generated!");
          done();
        });
    });
    it("should not generated otp to disabled 2FA", (done) => {
      const userId = "5f4f2e3b676104002301cbcc";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTkwNTA3MDIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJwYXNzd29yZCI6InBhc3MxMjMiLCJpYXQiOjE1OTkwNDcxMDJ9.f7km-0BKu2x8Egmo6_se45CYO2fI-2hrW9M5LpkcdUY";
      chai
        .request(server)
        .get("/auth/generate_otp/" + userId)
        .set({
          Authorization:
            "bearer " + token
        })
        .end((err, response) => {
          response.body.should.have
            .property("error")
            .to.equal("OTP not activated");
          done();
        });
    });
    it("should not generate otp if no token", (done) => {
      const userId = "5f4f2e3b676104002301cbcc";
      chai
      .request(server)
      .get("/auth/generate_otp/" + userId)
      .end((err, response) => {
        response.should.have.status(401)
        done();
      })
    });
  });
});
