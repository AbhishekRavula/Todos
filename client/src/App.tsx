import React from "react";
import "./App.css";
import { Login, Todos } from "./components";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "name"]);

  const logout = () => {
    removeCookie("token");
  };

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {cookies.token && (
          <>
            <div style={{ color: "#fff" }}>{`Welcome ${cookies.name}`}</div>
            <Button style={{ minWidth: 0 }} onClick={logout}>
              <LogoutIcon />
            </Button>
          </>
        )}
      </div>

      {cookies.token ? <Todos /> : <Login />}
    </div>
  );
}

export default App;
