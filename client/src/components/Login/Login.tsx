import { Button } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [cookies, setCookie] = useCookies(["token", "name"]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      });
      const jsonRes = await res.json();
      if (jsonRes.token) {
        setCookie("token", jsonRes.token);
      }
      if (jsonRes.name) {
        setCookie("name", jsonRes.name);
      }
      if (jsonRes.message) toast.error(jsonRes.message);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const signUp = async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      });
      const jsonRes = await res.json();
      if (jsonRes.token) {
        setCookie("token", jsonRes.token);
      }
      if (jsonRes.name) {
        setCookie("name", jsonRes.name);
      }
      if (jsonRes.message) toast.error(jsonRes.message);
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <label style={{ color: "#FFFF" }}>User Name:</label>
      <input
        type="text"
        className="todo-input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="user name"
        autoFocus
      />
      <label style={{ color: "#FFFF" }}>Password:</label>
      <input
        type="password"
        className="todo-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{ whiteSpace: "nowrap" }}
          className="todo-add-button"
          data-testid="add-new-item-button"
          onClick={login}
        >
          Log in
        </Button>
        <Button
          style={{ whiteSpace: "nowrap" }}
          className="todo-add-button"
          data-testid="add-new-item-button"
          onClick={signUp}
        >
          Sign up
        </Button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        closeButton={false}
      />
    </>
  );
};
