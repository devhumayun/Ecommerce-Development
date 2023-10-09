import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  createTag,
  deleteTag,
  tagDataEdit,
  tagStatusUpdate,
} from "../../features/product/productApiSlice";
import useFormFields from "../../hooks/useFormFields";
import { createToast } from "../../utlis/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import DataTable from "react-data-table-component";
import { timeago } from "../../helper/healper";
import swal from "sweetalert";

const Tag = () => {
  // Data table for brands
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
    },
    {
      name: "CreatedAt",
      selector: (row) => timeago(new Date(row.createdAt)),
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
              onClick={() => handleTagStatusUpdate(row._id, row.status)}
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
              data-target="#editTagModal"
              data-toggle="modal"
              className="edit-botton"
              onClick={() => handleTagEdit(row._id)}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="trash-botton"
              onClick={() => handleTagDelete(row._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </>
      ),
    },
  ];
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  // tag search
  const handleSearch = (value) => {
    setSearch(value);
  };

  // call use form fields hook
  const { input, handleInputChange, formEmpty } = useFormFields({
    name: "",
  });

  const { error, message, loader, tag } = useSelector((state) => state.product);

  const handleAddTagFrom = (e) => {
    e.preventDefault();
    dispatch(createTag({ name: input.name }));
    formEmpty();
  };

  // tag status update
  const handleTagStatusUpdate = (id, status) => {
    dispatch(tagStatusUpdate({ id, status }));
  };

  // tag delete
  const handleTagDelete = (id) => {
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
        dispatch(deleteTag(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // edit tag
  const [editTag, setEditTag] = useState({});
  const handleTagEdit = (id) => {
    const tagData = tag.find((data) => data._id === id);
    setEditTag(tagData);
  };
  const handleEditTagChange = (e) => {
    setEditTag((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditTagFrom = (e) => {
    e.preventDefault();
    dispatch(
      tagDataEdit({
        id: editTag._id,
        name: editTag.name,
      })
    );
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
      <ModalPopup target="tagModal">
        <form onSubmit={handleAddTagFrom}>
          <div className="my-3">
            <label>Tag Name</label>
            <input
              name="name"
              type="text"
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block">
              {loader ? "Creating Tag . . ." : "Add New Tag"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="editTagModal">
        <form onSubmit={handleEditTagFrom}>
          <div className="my-3">
            <label>Tag Name</label>
            <input
              name="name"
              type="text"
              value={editTag.name}
              onChange={handleEditTagChange}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block">
              {loader ? "Creating Tag . . ." : "Add New Tag"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#tagModal"
            data-toggle="modal"
            className="btn btn-primary mb-3"
          >
            Add New Tag
          </button>
        </div>
      </div>
      <br />
      <br />
      <DataTable
        title="All Tags"
        data={tag ? tag : []}
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

export default Tag;
