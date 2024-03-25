import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("Todo List", () => {
  it("should render todo items", async () => {
    const todoList = [
      {
        _id: "1",
        name: "Build TDD demo app",
        completed: false,
      },
      {
        _id: "2",
        name: "Drink Water",
        completed: true,
      },
    ];

    render(
      <TodoList todos={todoList} onDelete={() => { }} onUpdate={() => { }} />
    );

    const todoListEle = await screen.findByRole("list");
    const todoListItems = await screen.findAllByRole("listitem");
    expect(todoListEle).toBeInTheDocument();
    for (const todoListItem of todoListItems) {
      expect(todoListItem).toBeInTheDocument();
    }
  });

  it("should render empty help text when todo list is empty", async () => {
    render(<TodoList todos={[]} onDelete={() => { }} onUpdate={() => { }} />);
    const helpTextElement = screen.getByText("No Tasks Yet. Add Some!");
    expect(helpTextElement).toBeInTheDocument();
  });
});
