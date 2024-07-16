import React, { useContext } from "react";
import RoutesComponent from "./components/Routes/RoutesComponent";
import AuthContext from "./store/auth-context";
import SideBar from "./components/Layout/SideBar";
import NavBar from "./components/Layout/NavBar";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <>
      {isLoggedIn && <NavBar />}
      <div style={{ display: "flex" }}>
        {isLoggedIn && <SideBar />}
        <RoutesComponent />
      </div>
    </>
  );
};

export default App;
