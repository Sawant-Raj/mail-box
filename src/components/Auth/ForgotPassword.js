import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./AuthForm.module.css";

const ForgotPassword = () => {
  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAnCX0mjm-Uhts56l6CZ04wdOhQXI4E-iw",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset link.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);

      emailInputRef.current.value = "";
    }
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>Reset Password</h1>
        <form onSubmit={submitHandler}>
          <p>Enter the email with which you have registered.</p>
          <div className={classes.control}>
            <input
              type="email"
              placeholder="Email"
              ref={emailInputRef}
              required
            />
          </div>

          <div className={classes.actions}>
            <button type="submit">
              {isLoading ? "Sending..." : "Send Link"}
            </button>
          </div>
        </form>
        <div className={classes.footer}>
          <p>
            Already a user?
            <Link to="/">Login</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
