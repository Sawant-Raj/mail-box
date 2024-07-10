import React, { useState } from "react";
import classes from "./Home.module.css";
import ComposeEmail from "./ComposeEmail"; // Import your ComposeEmail component

const Home = () => {
  const [showCompose, setShowCompose] = useState(false);

  const toggleCompose = () => {
    setShowCompose(!showCompose);
  };

  return (
    <>
      <header className={classes.header}>
        <p className={classes.para}>Welcome to Mail Box!</p>
      </header>
      <div className={classes.line}></div>
      <button onClick={toggleCompose}>Compose Email</button>
      {showCompose && <ComposeEmail />} {/* Conditionally render ComposeEmail */}
    </>
  );
};

export default Home;
