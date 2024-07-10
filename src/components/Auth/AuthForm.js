import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (confirmPasswordInputRef.current) {
      confirmPasswordInputRef.current.value = "";
    }
  };

  const loginHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      await authCtx.loginHandler(enteredEmail, enteredPassword);
    } else {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const signUpSuccess = await authCtx.signUpHandler(enteredEmail, enteredPassword);
      if (signUpSuccess) {
        setIsLogin(true);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
              required
            />
          </div>
        )}
        {isLogin && (
          <div className={classes["forgot-password-container"]}>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
        )}
        <div className={classes.actions}>
          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </div>
      </form>
      <div className={classes.footer}>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleIsLogin}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default AuthForm;
