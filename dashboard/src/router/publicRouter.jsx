import ForgetPass from "../pages/auth/ForgetPass";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PublicGard from "./PublicGard";

// create public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget",
        element: <ForgetPass />,
      },
    ],
  },
];

// export router
export default publicRouter;
