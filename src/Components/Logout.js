import React from "react";
import classes from "./Logout.module.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/", { replace: true });
    window.localStorage.removeItem("userCred");
  };
  return (
    <button className={classes.logoutButton} onClick={logoutHandler}>
      <AiOutlineLogout className={classes.logoutIcon} />
    </button>
  );
};

export default Logout;
