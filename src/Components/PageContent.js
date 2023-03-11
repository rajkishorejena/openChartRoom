import { Link } from "react-router-dom";
import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
      <h3>
        Navigate to <Link to="/">home</Link>
      </h3>
    </div>
  );
}

export default PageContent;
