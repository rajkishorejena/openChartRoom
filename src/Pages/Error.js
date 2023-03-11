import React from "react";
import PageContent from "../Components/PageContent";
import { useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong!";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "could not find resource or page.";
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
};

export default Error;
