import App from "../../App";
import { fireEvent, render, screen } from "@testing-library/react";

export async function AddAndGetNewTodoItem(newItemName: string) {
  render(<App />);
  const todoInput = screen.getByTestId("add-new-item-input");
  const todoInputAdd = screen.getByTestId("add-new-item-button");

  fireEvent.change(todoInput, { target: { value: newItemName } });
  fireEvent.click(todoInputAdd);

  const newTodoItem = await screen.findByText(newItemName);

  return newTodoItem;
}
