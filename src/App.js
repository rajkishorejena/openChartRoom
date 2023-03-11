import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChartRoom from "../src/Pages/ChartRoom";
import JoinUser from "./Pages/JoinUser";
import Error from "./Pages/Error";
import { checkAuthLoader } from "./Utils/Auth";

function App() {
  // const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <JoinUser />,
      errorElement: <Error />,
    },
    {
      path: "/chart",
      element: <ChartRoom />,
      errorElement: <Error />,
      loader: checkAuthLoader,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
