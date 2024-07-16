import React from "react";
import { Link } from "react-router-dom";
import classes from "./SideBar.module.css";

const SideBar = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <Link to="/compose-email" className={classes.link}>
            Compose Email
          </Link>
          <Link to="/inbox" className={classes.link}>
            Inbox
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
