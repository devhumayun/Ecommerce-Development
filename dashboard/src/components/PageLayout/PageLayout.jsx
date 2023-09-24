import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

const PageLayout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SideBar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
