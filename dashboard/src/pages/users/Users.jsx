import { useEffect } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import useFormFields from "../../hooks/useFormFields";
import { generateRandomPassword, timeago } from "../../helper/healper";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser } from "../../features/user/userApiSlice";
import { createToast } from "../../utlis/toast";
import {
  getUserPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import swal from "sweetalert";
const Users = () => {
  // dispatch and selector
  const dispatch = useDispatch();
  const { user, role, message, error } = useSelector(getUserPermissionData);

  // call use form fields hook
  const { input, handleInputChange, setInput, formEmpty } = useFormFields({
    name: "",
    email: "",
    password: "",
  });
  // generate a random password
  const handleRandomPassword = (e) => {
    e.preventDefault();
    const rp = generateRandomPassword();
    setInput((preState) => ({
      ...preState,
      password: rp,
    }));
  };
  // Add user form
  const handleAddUserForm = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    formEmpty({
      name: "",
      email: "",
      password: "",
    });
  };

  // Delete user
  const handleUserDelete = (id) => {
    swal({
      title: "Delete User",
      text: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Role Deleted Successfull!", {
          icon: "success",
        });
        dispatch(deleteUser(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
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

  // Data Table Load
  useEffect(() => {
    new DataTable(".datatable");
  });

  return (
    <>
      <PageTitle title="User" />
      <ModalPopup target="userModal">
        <form onSubmit={handleAddUserForm}>
          <div className="my-3">
            <label>Name</label>
            <input
              name="name"
              value={input.name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label>Email</label>
            <input
              name="email"
              value={input.email}
              onChange={handleInputChange}
              type="email"
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label>Password</label>
            <input
              name="password"
              value={input.password}
              onChange={handleInputChange}
              type="password"
              className="form-control"
            />
            <a onClick={handleRandomPassword} className="mt-2" href="#">
              {" "}
              Random Password{" "}
            </a>
          </div>
          <div className="my-3">
            <label>Role</label>
            <select className="form-control" name="role" value={input.role} onChange={handleInputChange} id="">
              <option value="">-select-</option>
              {
                role?.map((item,index) => {
                  return(
                   <option key={index} value={item._id}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block"> Add User </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#userModal"
            data-toggle="modal"
            className="btn btn-primary mb-3"
          >
            {" "}
            Add New
          </button>
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Users List</h4>
            </div>
            <div className="card-body" style={{ padding: "20px" }}>
              <div className="table-responsive">
                {user && (
                  <table className="datatable datatableuser table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {data.name} </td>
                            <td> {data.email} </td>
                            <td>{data?.role?.name}</td>
                            <td> {timeago(new Date(data.createdAt))}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button
                                data-target="#roleEditModal"
                                data-toggle="modal"
                                className="edit-botton"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button onClick={() => handleUserDelete(data._id)} className="trash-botton">
                                <i className="fa fa-trash"></i>
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

export default Users;
