import App from "./App.tsx";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddAndGetNewTodoItem } from "./test/utils/index.tsx";
import { server } from "../src/test/mocks/server.ts";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe("Todo App", () => {
  it("should render todo list", async () => {
    render(<App />);
    const todoList = await screen.findByRole("list");
    const todoListItems = await screen.findAllByRole("listitem");
    expect(todoList).toBeInTheDocument();
    for (const todoListItem of todoListItems) {
      expect(todoListItem).toBeInTheDocument();
    }
  });

  it("should add new todo item", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Wake up at 6");
    expect(newTodoItem).toBeInTheDocument();
  });

  it("should update todo item", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Eat");
    expect(newTodoItem).toBeInTheDocument();

    const newTodoItemEditButton = screen.getByTestId("edit-todo-item" + "Eat");

    fireEvent.click(newTodoItemEditButton);

    const newTodoItemEditInput = screen.getByTestId("edit-item-input" + "Eat");

    fireEvent.change(newTodoItemEditInput, { target: { value: "Ate" } });

    const newTodoItemUpdate = screen.getByTestId("update-item" + "Eat");

    fireEvent.click(newTodoItemUpdate);

    const updatedTodoItem = await screen.findByText("Ate");

    expect(updatedTodoItem).toBeInTheDocument();
  });

  it("should mark todo item as completed", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Watch movie");
    expect(newTodoItem).toBeInTheDocument();

    const todoItemMarkCompleteButton = screen.getByTestId(
      "mark-complete-todo-item" + "Watch movie"
    );

    fireEvent.click(todoItemMarkCompleteButton);

    const todoItemCompleted = await screen.findByTestId(
      "completed-todo-item" + "Watch movie"
    );

    expect(todoItemCompleted).toBeInTheDocument();
  });

  it("should delete todo item", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Learn TDD");
    expect(newTodoItem).toBeInTheDocument();

    const todoItemDeleteButton = screen.getByTestId(
      "delete-todo-item" + "Learn TDD"
    );

    fireEvent.click(todoItemDeleteButton);

    await waitFor(() => {
      expect(todoItemDeleteButton).not.toBeInTheDocument();
    });
  });
});
