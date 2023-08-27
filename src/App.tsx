import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useEffect } from "react";
import apiClient from "./services/api-client";
import { CanceledError } from "axios";
import UserSpaces from "./components/UserSpaces";
import Space from "./components/space/Space";
import { Text } from "@chakra-ui/react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .post("/verifySession", {
        signal: controller.signal,
      })
      .then(() => {
        if (["/", "/login", "/register"].includes(location.pathname)) {
          navigate("/spaces", { replace: true });
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        if (!["/", "/login", "/register"].includes(location.pathname)) {
          navigate("/login", { replace: true });
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/spaces" element={<UserSpaces />} />
        <Route path="/spaces/:spaceId" element={<Space />} />
        <Route path="*" element={<Text>404 PAGE NOT</Text>} />
      </Routes>
    </>
  );
}

export default App;
