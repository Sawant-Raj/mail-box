import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logoutHandler();
  };

  return (
    <div>
      <header className={classes.header}>
        <p className={classes.para}>Mail Box</p>
        <button onClick={logoutHandler} className={classes.logoutButton}>
          Logout
        </button>
      </header>
    </div>
  );
};

export default NavBar;
