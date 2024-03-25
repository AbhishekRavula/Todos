import { rest } from "msw";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  rest.get(`${apiUrl}/todos`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1",
          name: "Build TDD demo app",
          completed: false,
        },
        {
          id: "2",
          name: "Drink Water",
          completed: true,
        },
      ])
    );
  }),
  rest.post(`${apiUrl}/todos`, async (req, res, ctx) => {
    const reqBody = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        id: "3",
        name: reqBody.name,
        completed: false,
      })
    );
  }),

  rest.patch(`${apiUrl}/todos/:id`, async (req, res, ctx) => {
    const newTodoItem = await req.json();
    return res(ctx.status(200), ctx.json(newTodoItem));
  }),

  rest.delete(`${apiUrl}/todos/:id`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
