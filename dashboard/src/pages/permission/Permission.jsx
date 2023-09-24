import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  permissionStatusUpdate,
} from "../../features/user/userApiSlice";
import { setMessageEmpty } from "../../features/user/userSlice";
import { createToast } from "../../utlis/toast";
import { timeago } from "../../helper/healper";


const Permission = () => {
  // dispatch, selector
  const dispatch = useDispatch();
  const { permission, message, error } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePermissionForm = (e) => {
    e.preventDefault();

    dispatch(createPermission(input));
    setInput({
      name: "",
    });
  };

  const handlePermissionDelete = (id) => {
    dispatch(deletePermission(id));
  };

  const handlePermissionStatus = (id,status) => {
    dispatch(permissionStatusUpdate({id, status}))
  }

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

  useEffect(() => {
    new DataTable(".datatable");
  });

  return (
    <>
      <PageTitle title="Permission" />
      <ModalPopup target="permissionModal">
        <form onSubmit={handlePermissionForm}>
          <div className="my-3">
            <label htmlFor=""> Name </label>
            <input
              value={input.name}
              name="name"
              onChange={handleInputChange}
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-block btn-primary" type="submit">
            {" "}
            Add Permission{" "}
          </button>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#permissionModal"
            data-toggle="modal"
            className="btn btn-primary mb-3"
          >
            {" "}
            Add New Permission
          </button>
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body" style={{ padding: "20px" }}>
              <div className="table-responsive">
                {permission && (
                  <table className="datatable datatablepermission table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {item.name} </td>
                            <td> {item.slug} </td>
                            <td> {timeago(new Date(item.createdAt))} </td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked = {item.status ? true : false}
                                />
                                <label
                                  onClick={() => handlePermissionStatus(item._id, item.status)}
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button className="trash-botton"
                                onClick={() => handlePermissionDelete(item._id)}
                              >
                                {" "}
                                <i className=" fa fa-trash"></i>{" "}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;
