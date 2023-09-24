
// create a browser router

import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./privateRouter";
import publicRouter from "./publicRouter";
import Layout from "../layouts/Layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [...privateRouter, ...publicRouter]
    }
])

// export router
export default router