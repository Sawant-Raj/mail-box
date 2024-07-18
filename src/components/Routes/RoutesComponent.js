import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "../Auth/AuthForm";
import ForgotPassword from "../Auth/ForgotPassword";
import Error from "../Error/Error";
import AuthContext from "../../store/auth-context";
import Inbox from "../../pages/Inbox";
import ComposeEmail from "../../pages/ComposeEmail";
import Sent from "../../pages/Sent";

const RoutesComponent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/inbox" /> : <AuthForm />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/inbox"
        element={isLoggedIn ? <Inbox /> : <Navigate to="/" />}
      />
      <Route path="/compose-email" element={<ComposeEmail />} />
      <Route
        path="/sent"
        element={isLoggedIn ? <Sent /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default RoutesComponent;
