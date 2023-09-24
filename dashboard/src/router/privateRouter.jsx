import PageLayout from "../components/PageLayout/PageLayout";
import Brand from "../pages/brand/Brand";
import Category from "../pages/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import Order from "../pages/order/order";
import Permission from "../pages/permission/Permission";
import Product from "../pages/products/Product";
import Role from "../pages/role/Role";
import Tag from "../pages/tag/Tag";
import Users from "../pages/users/Users";
import PrivateGard from "./privateGard";


// create private router
const privateRouter = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/order",
            element: <Order />,
          },
          {
            path: "/product",
            element: <Product />,
          },
          {
            path: "/tag",
            element: <Tag />,
          },
          {
            path: "/brand",
            element: <Brand />,
          },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
