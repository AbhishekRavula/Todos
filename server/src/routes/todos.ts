import express, { Request, Response } from "express";
import todoModel from "../models/todoModel";
import authenticate from "../middlewares/auth";

const router = express.Router();

// getting todo items
router.get("/", authenticate, async (req: Request, res: Response) => {
  const user = res.locals.user;
  const todos = await todoModel.find({ createdBy: user._id });
  return res.status(200).json(todos);
});

// getting specific todo item
router.get("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todoItem = await todoModel.findById(id);
    return res.status(200).json(todoItem);
  } catch (error) {
    return res.status(404).end();
  }
});

// creating todo item
router.post("/", authenticate, async (req: Request, res: Response) => {
  const newTodoItemName = req.body.name;
  if (!newTodoItemName || typeof newTodoItemName !== "string") {
    return res.status(400).end();
  }

  const user = res.locals.user;
  const newTodoItem = {
    name: newTodoItemName,
    createdBy: user._id,
    completed: false,
  };

  const todo = await todoModel.create(newTodoItem);
  return res.json(todo);
});

// updating todo item
router.patch("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const todoData = req.body;
    const id = req.params.id;

    if (
      (todoData.completed && typeof todoData.completed !== "boolean") ||
      (todoData.name && typeof todoData.name !== "string")
    ) {
      return res.status(400).end();
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(id, todoData, {
      returnDocument: "after",
    });

    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(400).end();
  }
});

//deleting todo item
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await todoModel.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).end();
  }
});

export default router;
