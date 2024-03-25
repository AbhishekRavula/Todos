import request from "supertest";
import app from "../app";
import * as todos from "./todos";

beforeEach(() => {
  Object.defineProperty(todos, "todosList", {
    value: [
      {
        id: "1",
        name: "Build TDD demo app",
        completed: false,
      },
      {
        id: "2",
        name: "Drint Water",
        completed: true,
      },
    ],
  });
});

describe("Todos API", () => {
  // getting todo items
  describe("GET /todos", () => {
    it("should return the list of todo items", async () => {
      const response = await request(app).get("/todos");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            completed: expect.any(Boolean),
          }),
        ])
      );
    });
  });

  // getting specific todo item
  describe("GET /todos/id", () => {
    describe("if specific todo item exists", () => {
      it("should return todo item", async () => {
        const response = await request(app).get("/todos/2");
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
    });
    describe("if specific todo item does not exists", () => {
      it("should return Not Found 404 status code", async () => {
        const response = await request(app).get("/todos/3");
        expect(response.status).toEqual(404);
      });
    });
  });

  // creating todo item
  describe("POST /todos", () => {
    describe("if request body is valid", () => {
      it("should create new todo item", async () => {
        const response = await request(app).post("/todos").send({
          name: "Writes test cases",
        });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: "Writes test cases",
            completed: false,
          })
        );
      });
    });
    describe("if request body is not valid", () => {
      it("should return Bad Request 400 status code", async () => {
        const response = await request(app).post("/todos").send({ name: 123 });
        expect(response.status).toEqual(400);
      });
    });
  });

  // updating todo item
  describe("PATCH /todos/id", () => {
    describe("if specific todo item exists", () => {
      describe("if data to update is valid", () => {
        it("should update existing todo item with new data", async () => {
          const response = await request(app)
            .patch("/todos/1")
            .send({ completed: true });

          expect(response.status).toEqual(200);
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              completed: true,
            })
          );
        });
      });
      describe("if data to update is not valid", () => {
        it("should return Bad Request 400 status code", async () => {
          const response = await request(app)
            .patch("/todos/2")
            .send({ completed: "true" });

          expect(response.status).toEqual(400);
        });
      });
    });

    describe("if specific todo item does not exists", () => {
      it("should return Bad Request 400 status code", async () => {
        const response = await request(app).patch("/todos/3");
        expect(response.status).toEqual(400);
      });
    });
  });

  //  deleting todo item
  describe("DELETE /todos/id", () => {
    describe("if specific todo item exists", () => {
      it("should delete todo item", async () => {
        const response = await request(app).delete("/todos/1");
        expect(response.status).toEqual(200);
      });
    });
    describe("if specific todo item does not exists", () => {
      it("should return Bad Request 400 status code", async () => {
        const response = await request(app).delete("/todos/3");
        expect(response.status).toEqual(400);
      });
    });
  });
});
