import { redirect } from "react-router-dom";

export const checkAuthLoader = () => {
  const userDetails = JSON.parse(window.localStorage.getItem("userCred"));
  if (userDetails === null) {
    return redirect("/");
  }
  return null;
};
