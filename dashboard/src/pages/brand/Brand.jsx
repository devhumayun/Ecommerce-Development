import { useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";

const Brand = () => {

  const [logoPrev, setLogoPrev] = useState("")
  // logo preview
  const handleLogoPrev = (e) => {
    setLogoPrev(URL.createObjectURL(e.target.files[0]))
  }

  // Add user form
  const handleAddUserForm = (e) => {
    e.preventDefault();
  };


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
            <button className="btn btn-primary btn-block"> Add Brand</button>
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
    </>
  );
};

export default Brand;
