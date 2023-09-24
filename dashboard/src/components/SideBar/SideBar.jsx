import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const SideBar = () => {
  const location = useLocation();
  const { user } = useAuthUser();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Orders") && (
                <li
                  className={`${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                >
                  <Link to="/order">
                    <i className="fe fe-user"></i> <span>Orders</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Products") && (
                <li
                  className={`${
                    location.pathname === "/product" ? "active" : ""
                  }`}
                >
                  <Link to="/product">
                    <i className="fe fe-bolt"></i> <span>Products</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Category") && (
                <li
                  className={`${
                    location.pathname === "/category" ? "active" : ""
                  }`}
                >
                  <Link to="/category">
                    <i className="fe fe-bolt"></i> <span>Category</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Tag") && (
                <li
                  className={`${location.pathname === "/tag" ? "active" : ""}`}
                >
                  <Link to="/tag">
                    <i className="fe fe-bolt"></i> <span>Tag</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Brand") && (
                <li
                  className={`${
                    location.pathname === "/brand" ? "active" : ""
                  }`}
                >
                  <Link to="/brand">
                    <i className="fe fe-bolt"></i> <span>Brand</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Users") && (
                <li
                  className={`${
                    location.pathname === "/users" ? "active" : ""
                  }`}
                >
                  <Link to="/users">
                    <i className="fe fe-bolt"></i> <span>Users</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Role") && (
                <li
                  className={`${location.pathname === "/role" ? "active" : ""}`}
                >
                  <Link to="/role">
                    <i className="fa fa-anchor"></i> <span>Role</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Permissions") && (
                <li
                  className={`${
                    location.pathname === "/permission" ? "active" : ""
                  }`}
                >
                  <Link to="/permission">
                    <i className="fa fa-lock"></i> <span>Permission</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
