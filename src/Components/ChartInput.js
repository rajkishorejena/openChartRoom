import React, { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import classes from "./ChartInput.module.css";
const ChartInput = ({ handleSendMsg }) => {
  const message = useRef();
  const sendChat = (e) => {
    e.preventDefault();
    handleSendMsg(message.current.value);
    message.current.value = "";
  };
  return (
    <div className={classes.chartInput}>
      <form className={classes.form} onSubmit={(event) => sendChat(event)}>
        <input ref={message} type="text" placeholder="type your message here" />
        <button type="submit" className={classes.button}>
          <IoMdSend className={classes.sendButton} />
        </button>
      </form>
    </div>
  );
};

export default ChartInput;
