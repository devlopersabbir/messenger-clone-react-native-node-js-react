import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Singup from "./pages/Auth/Singup";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { logout } from "./redux/slice/authSlice";
import { unset_all_chat } from "./redux/slice/chatSlice";
import useSocket from "./hooks/useSocket";
import { connect } from "./redux/slice/socketSlice";
import Upload from "./pages/Upload/Upload";
import VideoChat from "./pages/VideoChat";

const App = () => {
  const { token } = useSelector(({ authReducer }: any) => authReducer);
  const dispatch = useDispatch();

  const socket = useSocket();
  useEffect(() => {
    socket.connect();
    console.log("socket is connected 🚀");
    return () => {
      socket.off("connect_error");
    };
  }, []);
  return (
    <React.Fragment>
      <BrowserRouter>
        <Button
          onClick={() => {
            dispatch(logout());
            dispatch(unset_all_chat());
          }}
        >
          Logout
        </Button>
        <Routes>
          <Route path="/">
            <Route
              element={token ? <Home /> : <Navigate replace to="/auth/login" />}
              index
            />
            <Route
              path="video-chat"
              element={
                token ? <VideoChat /> : <Navigate replace to="/auth/login" />
              }
            />
            <Route path="/uploads" element={<Upload />} />
          </Route>
          <Route path="/auth">
            <Route
              element={!token ? <Singup /> : <Navigate replace to="/" />}
              path="singup"
            />
            <Route
              element={!token ? <Login /> : <Navigate replace to="/" />}
              path="login"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
