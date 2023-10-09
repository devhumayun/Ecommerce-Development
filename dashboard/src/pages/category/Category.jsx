import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryStatusUpdate,
  createCategory,
  deleteCategory,
} from "../../features/product/productApiSlice";
import useFormFields from "../../hooks/useFormFields";
import { createToast } from "../../utlis/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import DataTable from "react-data-table-component";
import { timeago } from "../../helper/healper";
import swal from "sweetalert";

const Category = () => {
  // Data table for brands
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row.subCategory?.map((item,index) => {
        return(
          <li style={{listStyle:"none"}} key={index}> { "-" + " " + item.name} </li>
        )
      }),
      sortable: true,
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
      name: "Icon",
      selector: (row) => row.icon ? row.icon : "-",
    },
    {
      name: "Logo",
      selector: (row) => (
        <>
          <img
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              borderRadius: "5px",
              margin: "5px",
            }}
            src={row.photo}
            alt=""
          />
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div className="status-toggle">
            <input
              type="checkbox"
              id="status_1"
              className="check"
              checked={row.status ? true : false}
            />
            <label
              onClick={() => handleCatStatusUpdate(row._id, row.status)}
              htmlFor="status_1"
              className="checktoggle"
            >
              checkbox
            </label>
          </div>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <td className="text-right">
            <button
              data-target="#brandEditModal"
              data-toggle="modal"
              className="edit-botton"
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="trash-botton"
              onClick={() => handleCategoryDelete(row._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </>
      ),
    },
  ];

  const [logo, setLogo] = useState(null);
  const [catPhoto, setCatPhoto] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  // logo preview
  const handleLogoPrev = (e) => {
    setCatPhoto(URL.createObjectURL(e.target.files[0]));
    setLogo(e.target.files[0]);
  };

  // call use form fields hook
  const { input, handleInputChange, formEmpty } = useFormFields({
    name: "",
    icon: "",
    parent: ""
  });

  console.log(input);

  const { error, message, loader, category } = useSelector(
    (state) => state.product
  );

  // Add brand from
  const form_data = new FormData();
  form_data.append("name", input.name);
  form_data.append("parentCategory", input.parent);
  form_data.append("icon", input.icon);
  form_data.append("catPhoto", logo);

  const handleAddCategoryForm = (e) => {
    e.preventDefault();
    dispatch(createCategory(form_data));
    formEmpty();
  };

  // search brand
  const handleSearch = (value) => {
    setSearch(value);
  };

  // delete category
  const handleCategoryDelete = (id) => {
    swal({
      title: "Delete Category",
      text: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Category Deleted Successfull!", {
          icon: "success",
        });
        dispatch(deleteCategory(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // brand status update
  const handleCatStatusUpdate = (id, status) => {
    dispatch(categoryStatusUpdate({ id, status }));
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
      <ModalPopup target="categorydModal">
        <form onSubmit={handleAddCategoryForm}>
          <div className="my-3">
            <label>Category Name</label>
            <input
              name="name"
              type="text"
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label>Category Icon</label>
            <input
              name="icon"
              type="text"
              value={input.icon}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label>Parent Category</label>
            <select name="parent" value={input.parent}  onChange={handleInputChange}  className="form-control">
              <option value=""> -select- </option>
              {
                category?.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>
          {catPhoto && (
            <div className="my-3">
              <img style={{ width: "100%" }} src={catPhoto} alt="" />
            </div>
          )}
          <div className="my-3">
            <label>Category Photo</label>
            <input
              name="catPhoto"
              type="file"
              className="form-control"
              onChange={(e) => handleLogoPrev(e)}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block">
              {loader ? "Creating Category . . ." : "Add New Category"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#categorydModal"
            data-toggle="modal"
            className="btn btn-primary mb-3"
          >
            {" "}
            Add New Category
          </button>
        </div>
      </div>
      <br />
      <br />
      <DataTable
        title="All  Categories"
        data={category ? category : []}
        columns={columns}
        highlightOnHover
        pointerOnHover
        selectableRows
        pagination
        fixedHeader
        subHeader
        subHeaderComponent={
          <>
            {" "}
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              placeholder="search ..."
              className="form-control"
              style={{ width: "250px" }}
            />{" "}
          </>
        }
      />
    </>
  );
};

export default Category;
