import React from "react";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <>
      <header className={classes.header}>
        <p className={classes.para}>Welcome to Expense Tracker!!!</p>
      </header>
      <div className={classes.line}></div>
    </>
  );
};

export default Home;
