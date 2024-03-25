import { TodoInput } from "./TodoInput";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Todo Input", () => {
  it("should render input field and add button", async () => {
    render(<TodoInput onAddTodo={() => {}} />);

    const inputElement = screen.getByTestId("add-new-item-input");
    const addButtonElement = screen.getByTestId("add-new-item-button");

    expect(inputElement).toBeInTheDocument();
    expect(addButtonElement).toBeInTheDocument();
  });

  it("should disable add button when input field is empty", async () => {
    render(<TodoInput onAddTodo={() => {}} />);

    const addButtonElement = screen.getByTestId("add-new-item-button");
    expect(addButtonElement).toBeDisabled();
  });

  it("should enable add button when input field is not empty", async () => {
    render(<TodoInput onAddTodo={() => {}} />);

    const addButtonElement = screen.getByTestId("add-new-item-button");
    const inputElement = screen.getByTestId("add-new-item-input");

    fireEvent.change(inputElement, { target: { value: "some" } });
    expect(addButtonElement).toBeEnabled();
  });

  it("should call callback function for add button click", async () => {
    const mockedAddTodo = vi.fn();

    render(<TodoInput onAddTodo={mockedAddTodo} />);

    const inputElement = screen.getByTestId("add-new-item-input");
    const addButtonElement = screen.getByTestId("add-new-item-button");

    fireEvent.change(inputElement, { target: { value: "sleep" } });
    fireEvent.click(addButtonElement);

    expect(mockedAddTodo).toHaveBeenCalledTimes(1);
  });
});
