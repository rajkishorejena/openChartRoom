import React, { useEffect, useState } from "react";
import classes from "./ChartRoom.module.css";
import Logout from "../Components/Logout";
import ChartInput from "../Components/ChartInput";
import { FaUserAlt } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slice/userSlice";
import { socket } from "../Utils/Socket";
import ScrollableFeed from "react-scrollable-feed";
import useFetch from "../hooks/useFetch";
import { sendMessageRoute, receiveMessageRoute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
const ChartRoom = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const { error, isLoading, sendRequest } = useFetch();

  useEffect(() => {
    socket.on("connection", null);
    socket.on("receive_message", (data) => {
      console.log("data", data);
      setMessages((list) => [...list, data]);
    });
    return function cleanup() {
      socket.removeListener("receive_message");
    };
  }, []);

  useEffect(() => {
    const requestMsgListConfig = {
      url: receiveMessageRoute,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        emailId: user.emailId,
        roomId: user.roomId,
      },
    };
    sendRequest(requestMsgListConfig, (data) => {
      if (data) {
        console.log("Message List", data);
        setMessages(data);
      } else {
        navigate("/");
      }
    });
  }, [user.roomId]);

  const emitMessage = async (newMessage) => {
    console.log("new message", newMessage);
    await socket.emit("send_message", newMessage);
  };

  const handleSendMsg = (msg) => {
    console.log("handle Send message", msg);
    if (msg && user) {
      const newMessage = {
        emailId: user.emailId,
        roomId: user.roomId,
        message: msg,
      };

      //Store message Api called
      const requestMsgConfig = {
        url: sendMessageRoute,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          emailId: user.emailId,
          roomId: user.roomId,
          message: msg,
        },
      };

      sendRequest(requestMsgConfig, (data) => {
        if (data) {
          console.log("send success", data);
        }
      });

      //Emit msg through socket
      emitMessage(newMessage);

      //Update the local Array ..
      setMessages((messages) => [...messages, newMessage]);
    }
  };

  return (
    <div className={classes.chartContainer}>
      <div className={classes.header}>
        <div className={classes.userDetails}>
          <FaUserAlt className={classes.avatar} />
          <h3>{user ? `${user.emailId}` : `DefaultUser`}</h3>
        </div>
        <Logout />
      </div>
      <div className={classes.ChartMessages}>
        <ScrollableFeed className={classes.scrollContainer}>
          {messages &&
            messages.map((message) => {
              return (
                <div
                  className={`${classes.messageCard}
                  ${
                    user.emailId === message.emailId
                      ? classes.user
                      : classes.other
                  }`}
                  key={uuid()}
                >
                  <p>{message.message}</p>
                </div>
              );
            })}
        </ScrollableFeed>
      </div>
      <ChartInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChartRoom;
