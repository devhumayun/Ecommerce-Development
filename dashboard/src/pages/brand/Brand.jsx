import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { createBrand } from "../../features/product/productApiSlice";
import useFormFields from "../../hooks/useFormFields";
import { createToast } from "../../utlis/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import DataTable from 'react-data-table-component';

const Brand = () => {

  const [logo, setLogo] = useState(null)
  const [logoPrev, setLogoPrev] = useState(null)
  const dispatch = useDispatch()
  // logo preview
  const handleLogoPrev = (e) => {
    setLogoPrev(URL.createObjectURL(e.target.files[0]))
    setLogo(e.target.files[0])
  }

    // call use form fields hook
    const { input, handleInputChange, formEmpty } = useFormFields({
      name: "",
    });

    const {error, message, loader, brand} = useSelector(state => state.product)

  // Add brand from
  const form_data = new FormData()
  form_data.append("name", input.name)
  form_data.append("logo", logo)

  const handleAddUserForm = (e) => {
    e.preventDefault();
    dispatch(createBrand(form_data))
    formEmpty()
  };

    // for message manage
    useEffect(() => {
      if (error) {
        createToast(error);
        dispatch(setMessageEmpty());
      }
      if (message) {
        createToast(message, "success");
        dispatch(setMessageEmpty());
      }
    }, [error, message, dispatch]);



  return (
    <>
      <PageTitle title="Admin" />
      <ModalPopup target="brandModal">
        <form onSubmit={handleAddUserForm}>
          <div className="my-3">
            <label>Brand Name</label>
            <input
              name="name"
              type="text"
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {
            logoPrev && (<div className="my-3">
            <img style={{width: "100%"}} src={logoPrev} alt="" />
          </div>)
          }
          <div className="my-3">
            <label>Brand Logo</label>
            <input
              name="name"
              type="file"
              className="form-control"
              onChange={(e) => handleLogoPrev(e)}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block">{loader ? "Creating brand . . ." : "Add New Brand"}</button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#brandModal"
            data-toggle="modal"
            className="btn btn-primary mb-3"
          >
            {" "}
            Add New Brand
          </button>
        </div>
      </div>
      <br />
      <br />
      <DataTable />
    </>
  );
};

export default Brand;
