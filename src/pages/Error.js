import React from "react";
import classes from "./Error.module.css";

const Error = () => {
  return (
    <>
      <div className={classes.errorContainer}>
        <h1 className={classes.errorTitle}>An error occurred!</h1>
        <p className={classes.errorMessage}>Could not find this page!</p>
      </div>
    </>
  );
};

export default Error;
