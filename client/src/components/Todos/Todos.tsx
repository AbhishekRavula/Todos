import React, { useEffect, useState } from "react";
import { TodoInput, TodoList } from "../index";
import { ITodoItem } from "../../types/todo";
import { useCookies } from "react-cookie";
import { cloneDeep } from "lodash";
import { jwtDecode } from "jwt-decode";

export const Todos = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [todoList, setTodoList] = useState<Array<ITodoItem>>([]);

  let headers = new Headers();
  headers.append("Authorization", "Bearer" + " " + cookies.token);
  headers.append("Content-Type", "application/json");

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      isTokenValid();
      const res = await fetch(`${apiUrl}/todos`, {
        headers: headers,
      });
      const todoList = await res.json();
      setTodoList(todoList);
    } catch (error) {
      console.log("error", error);
    }
  }

  const onAddTodo = async (newTodoName: string) => {
    try {
      isTokenValid();
      const res = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: newTodoName }),
      });
      const newTodoList = await res.json();
      setTodoList([...todoList, newTodoList]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onUpdateTodo = async (toUpdateTodoItem: ITodoItem) => {
    try {
      isTokenValid();
      const res = await fetch(`${apiUrl}/todos/${toUpdateTodoItem._id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(toUpdateTodoItem),
      });
      const updatedTodoItem = (await res.json()) as ITodoItem;
      const updatedTodosList = cloneDeep(todoList);
      const todoItemIndex = updatedTodosList.findIndex(
        (todoItem) => todoItem._id === updatedTodoItem._id
      );

      updatedTodosList[todoItemIndex] = {
        ...todoList[todoItemIndex],
        ...updatedTodoItem,
      };

      setTodoList(updatedTodosList);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDeleteTodo = async (todoItemId: string) => {
    try {
      isTokenValid();
      const res = await fetch(`${apiUrl}/todos/${todoItemId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (res.status === 200) {
        setTodoList((prevTodoList) =>
          prevTodoList.filter((prevList) => prevList._id !== todoItemId)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const isTokenValid = () => {
    if (!cookies.token) return false;
    const decodedToken = jwtDecode(cookies.token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    const isValid = !!decodedToken.exp && decodedToken.exp > currentTime;
    if (!isValid) {
      removeCookie("token");
      throw new Error("Token expired");
    }
  };

  return (
    <>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList
        todos={todoList}
        onUpdate={onUpdateTodo}
        onDelete={onDeleteTodo}
      />
    </>
  );
};
