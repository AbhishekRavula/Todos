import { TodoItem } from "./TodoItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Todo Item", () => {
  it("should render todo item with item name, edit, delete and completed buttons", async () => {
    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: false,
        }}
        onDelete={() => { }}
        onUpdate={() => { }}
      />
    );

    const itemNameElement = screen.getByText("Charge phone");
    const itemEditButton = screen.getByTestId(
      "edit-todo-item" + "Charge phone"
    );
    const itemDeleteButton = screen.getByTestId(
      "delete-todo-item" + "Charge phone"
    );
    const itemMarkCompleteButton = screen.getByTestId(
      "mark-complete-todo-item" + "Charge phone"
    );
    expect(itemNameElement).toBeInTheDocument();
    expect(itemEditButton).toBeInTheDocument();
    expect(itemDeleteButton).toBeInTheDocument();
    expect(itemMarkCompleteButton).toBeInTheDocument();
  });

  it("should call callback function for edit button click", async () => {
    const mockedUpdated = vi.fn();

    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: false,
        }}
        onDelete={() => { }}
        onUpdate={mockedUpdated}
      />
    );

    const itemEditButton = screen.getByTestId(
      "edit-todo-item" + "Charge phone"
    );

    fireEvent.click(itemEditButton);

    const itemEditInput = screen.getByTestId(
      "edit-item-input" + "Charge phone"
    );

    fireEvent.change(itemEditInput, {
      target: { value: "something edited here" },
    });

    const itemUpdateButton = screen.getByTestId("update-item" + "Charge phone");

    fireEvent.click(itemUpdateButton);

    expect(mockedUpdated).toHaveBeenCalledTimes(1);
  });

  it("should call callback function for delete button click", async () => {
    const mockedDelete = vi.fn();

    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: false,
        }}
        onDelete={mockedDelete}
        onUpdate={() => { }}
      />
    );

    const itemDeleteButton = screen.getByTestId(
      "delete-todo-item" + "Charge phone"
    );

    fireEvent.click(itemDeleteButton);
    expect(mockedDelete).toHaveBeenCalledTimes(1);
  });

  it("should call callback function for mark complete button click", async () => {
    const mockedUpdate = vi.fn();

    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: false,
        }}
        onDelete={() => { }}
        onUpdate={mockedUpdate}
      />
    );

    const markCompleted = screen.getByTestId(
      "mark-complete-todo-item" + "Charge phone"
    );

    fireEvent.click(markCompleted);

    expect(mockedUpdate).toHaveBeenCalledTimes(1);
  });

  it("should render input field with todo name and update button on edit button click", async () => {
    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: false,
        }}
        onDelete={() => { }}
        onUpdate={() => { }}
      />
    );

    const itemEditButton = screen.getByTestId(
      "edit-todo-item" + "Charge phone"
    );

    fireEvent.click(itemEditButton);

    const itemEditInput = screen.getByTestId(
      "edit-item-input" + "Charge phone"
    );

    const itemUpdateButton = screen.getByTestId("update-item" + "Charge phone");

    expect(itemEditInput).toBeInTheDocument();
    expect(itemUpdateButton).toBeInTheDocument();
  });

  it.only("should call callback function for update button click", async () => {
    const mockedUpdate = vi.fn();

    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: false,
        }}
        onDelete={() => { }}
        onUpdate={mockedUpdate}
      />
    );

    const itemEditButton = screen.getByTestId(
      "edit-todo-item" + "Charge phone"
    );

    fireEvent.click(itemEditButton);

    const itemUpdateButton = screen.getByTestId("update-item" + "Charge phone");

    const itemEditInput = screen.getByTestId(
      "edit-item-input" + "Charge phone"
    );

    fireEvent.change(itemEditInput, {
      target: { value: "Charge phone and laptop" },
    });

    fireEvent.click(itemUpdateButton);

    expect(mockedUpdate).toHaveBeenCalledTimes(1);
    expect(mockedUpdate).toHaveBeenCalledWith({
      id: "1",
      name: "Charge phone and laptop",
      completed: false,
    });
  });

  it("should not render edit and mark complete buttons for completed todo item but it should render competed text", async () => {
    render(
      <TodoItem
        todoItem={{
          _id: "1",
          name: "Charge phone",
          completed: true,
        }}
        onDelete={() => { }}
        onUpdate={() => { }}
      />
    );

    const itemNameElement = screen.getByText("Charge phone");
    const itemEditButton = screen.queryByTestId(
      "edit-todo-item" + "Charge phone"
    );
    const itemDeleteButton = screen.queryByTestId(
      "delete-todo-item" + "Charge phone"
    );
    const itemMarkCompleteButton = screen.queryByTestId(
      "mark-complete-todo-item" + "Charge phone"
    );

    const itemCompletedButton = screen.queryByTestId(
      "completed-todo-item" + "Charge phone"
    );
    expect(itemNameElement).toBeInTheDocument();
    expect(itemEditButton).toBeNull();
    expect(itemMarkCompleteButton).toBeNull();
    expect(itemDeleteButton).toBeInTheDocument();
    expect(itemCompletedButton).toBeInTheDocument();
  });
});
