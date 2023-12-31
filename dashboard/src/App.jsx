import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./features/auth/authApiSlice";
import { getAllPermission, getAllRole, getAllUsers } from "./features/user/userApiSlice";
import { AllBrands, getAllCategories, getAllTags } from "./features/product/productApiSlice";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem("user")){
      dispatch(getLoggedInUser())
    }
  },[dispatch])

  // Load All
  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRole())
    dispatch(getAllUsers())
    dispatch(AllBrands());
    dispatch(getAllTags())
    dispatch(getAllCategories())
  }, [dispatch]);


  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
