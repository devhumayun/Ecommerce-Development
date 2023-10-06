import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { brandStatusUpdate, createBrand, deleteBrand } from "../../features/product/productApiSlice";
import useFormFields from "../../hooks/useFormFields";
import { createToast } from "../../utlis/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import DataTable from "react-data-table-component";
import { timeago } from "../../helper/healper";
import swal from "sweetalert";

const Brand = () => {
  const [logo, setLogo] = useState(null);
  const [logoPrev, setLogoPrev] = useState(null);
  const [search, setSearch] = useState("")
  const dispatch = useDispatch();
  // logo preview
  const handleLogoPrev = (e) => {
    setLogoPrev(URL.createObjectURL(e.target.files[0]));
    setLogo(e.target.files[0]);
  };

  // call use form fields hook
  const { input, handleInputChange, formEmpty } = useFormFields({
    name: "",
  });

  const { error, message, loader, brand } = useSelector(
    (state) => state.product
  );

  // Add brand from
  const form_data = new FormData();
  form_data.append("name", input.name);
  form_data.append("logo", logo);

  const handleAddUserForm = (e) => {
    e.preventDefault();
    dispatch(createBrand(form_data));
    formEmpty();
  };

  // search brand
  const handleSearch = (value) => {
    setSearch(value)
  }

  // delete brand
  const handleBrandDelete = (id) => {
    swal({
      title: "Delete Brand",
      text: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Brand Deleted Successfull!", {
          icon: "success",
        });
        dispatch(deleteBrand(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  // brand status update
  // const handleStatusUpdate = (id, status) => {
  //   dispatch(brandStatusUpdate({id, status}))
  // }

  
  // Data table for brands
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable:true
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "CreatedAt",
      selector: (row) => timeago(new Date(row.createdAt)),
    },
    {
      name: "Status",
      selector: (row) => (
        <>

          <button onClick={handleTest(row.name)}> test</button>
          {/* <div className="status-toggle">
            <input onClick={() => handleStatusUpdate(console.log(row._id), row.status)} type="checkbox" id="status_1" className="check" checked={row.status ? true : false} />
            <label htmlFor="status_1" className="checktoggle">
              checkbox
            </label>
          </div> */}
        </>
      ),
    },
    {
      name: "Logo",
      selector: (row) => <>
        <img style={{width: "50px", height:"50px", objectFit: "contain", borderRadius:"5px", margin: "5px"}} src={row.logo} alt="" />
      </>
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <td className="text-right">
            <button
              data-target="#roleEditModal"
              data-toggle="modal"
              className="edit-botton"
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="trash-botton"
              onClick={() => handleBrandDelete(row._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </>
      ),
    },
  ];

  const handleTest = (id) => {
    alert()
  }

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
          {logoPrev && (
            <div className="my-3">
              <img style={{ width: "100%" }} src={logoPrev} alt="" />
            </div>
          )}
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
            <button className="btn btn-primary btn-block">
              {loader ? "Creating brand . . ." : "Add New Brand"}
            </button>
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
      <DataTable
        title="All Brands Data"
        data={brand ? brand : []}
        columns={columns}
        highlightOnHover
        pointerOnHover
        selectableRows
        pagination
        fixedHeader
        subHeader
        subHeaderComponent={
          <> <input value={search} onChange={(e) => handleSearch(e.target.value)} type="search" placeholder="search ..." className="form-control" style={{width: "250px"}} /> </>
        }
      />
    </>
  );
};

export default Brand;
