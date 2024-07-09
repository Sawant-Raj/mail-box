import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Error from "./pages/Error";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
