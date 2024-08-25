import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";

export const Login = () => {
  const theme = useTheme();

  const apiUrl = import.meta.env.VITE_API_URL;

  const [cookies, setCookie] = useCookies(["token", "name"]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setIsLoginLoadin] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const login = async () => {
    try {
      setIsLoginLoadin(true);
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
    } finally {
      setIsLoginLoadin(false);
    }
  };

  const signUp = async () => {
    try {
      setIsSignUpLoading(true);
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
    } finally {
      setIsSignUpLoading(false);
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
        <LoadingButton
          loading={isLoginLoading}
          style={{ whiteSpace: "nowrap" }}
          className="todo-add-button"
          data-testid="add-new-item-button"
          onClick={login}
          sx={{
            "& .MuiCircularProgress-root": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Log in
        </LoadingButton>
        <LoadingButton
          loading={isSignUpLoading}
          style={{ whiteSpace: "nowrap" }}
          className="todo-add-button"
          data-testid="add-new-item-button"
          onClick={signUp}
          sx={{
            "& .MuiCircularProgress-root": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Sign up
        </LoadingButton>
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
