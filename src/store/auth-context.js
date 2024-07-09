import React, { createContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  loginHandler: () => {},
  signUpHandler: () => {},
});

export const AuthContextProvider = (props) => {

  const navigate=useNavigate();

  const loginHandler = async (email, password) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9yCLX4ZX7Fn5Pl1o147KAFDHzolITrxk",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("data is", data);

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", email);

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const signUpHandler = async (email, password) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9yCLX4ZX7Fn5Pl1o147KAFDHzolITrxk",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("data is", data);

      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const contextValue = {
    loginHandler: loginHandler,
    signUpHandler: signUpHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
