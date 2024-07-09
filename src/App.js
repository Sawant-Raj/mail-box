import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Error from "./pages/Error";
import Home from "./pages/Home";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <AuthForm />}
      />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
