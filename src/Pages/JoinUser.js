import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./JoinUser.module.css";
import { BsSendFill } from "react-icons/bs";
// import sendLogo from "../Assets/openSend.png";
import { socket } from "../Utils/Socket";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";
const JoinUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef();
  const rooId = useRef();

  const joinRoom = (e) => {
    e.preventDefault();
    if (email.current.value && rooId.current.value) {
      const data = {
        emailId: email.current.value,
        roomId: rooId.current.value,
      };
      dispatch(login(data));
      window.localStorage.setItem("userCred", JSON.stringify(data));

      const response = socket.emit("join_room", rooId.current.value);
      console.log("response from socket", response);
      if (response.connected) {
        navigate("/chart");
      } else {
        alert("Not able to Connect the Room");
      }
    }
  };
  return (
    <div className={classes.rootDiv}>
      <form onSubmit={joinRoom} className={classes.form}>
        <div className={classes.brand}>
          <BsSendFill className={classes.logo} />
          <h1>Open 2 Chart </h1>
        </div>
        <input
          ref={email}
          type="email"
          placeholder="Email"
          name="emailId"
          min="3"
          required
        />
        <input
          ref={rooId}
          type="text"
          placeholder="Room Id"
          name="rooId"
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default JoinUser;
