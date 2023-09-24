import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getUserPermissionData } from "../../features/user/userSlice";
import useFormFields from "../../hooks/useFormFields";
import { createToast } from "../../utlis/toast";
import { setMessageEmpty } from "../../features/user/userSlice";
import {
  createRole,
  deleteRole,
  roleEditUpdate,
  roleStatusUpdate,
} from "../../features/user/userApiSlice";
import { timeago } from "../../helper/healper";
import swal from "sweetalert";
const Role = () => {
  // call selector and dispatch
  const { permission, error, message, role } = useSelector(
    getUserPermissionData
  );
  const dispatch = useDispatch();
  console.log(role);

  // state for checkbox
  const [selected, setSelected] = useState([]);
  //
  // call use form fields hook
  const { input, handleInputChange, formEmpty } = useFormFields({
    name: "",
  });
  // state for role edit form
  const [ roleEdit, setRoleEdit ] = useState({})

  const handleCheckbox = (e) => {
    const val = e.target.value;
    const updatedList = [...selected];
    if (selected.includes(val)) {
      updatedList.splice(selected.indexOf(val), 1);
    } else {
      updatedList.push(val);
    }
    return setSelected(updatedList);
  };

  const handleRoleForm = (e) => {
    e.preventDefault();
    dispatch(
      createRole({
        permissions: [...selected],
        name: input.name,
      })
    );
    formEmpty();
    setSelected([]);
  };

  // Role Edit
  const handleRoleEditChange = (e) => {
    setRoleEdit((preState) => ({
      ...preState,
      [e.target.name]: e.target.value
    }))
  }
  const handleRoleEdit = (id) => {
    const editData = role.find(data => data._id === id)
    setRoleEdit(editData)
    setSelected(editData.permissions)
  }
  const handleRoleEditForm = (e) => {
    e.preventDefault()
    dispatch(roleEditUpdate({
      id: roleEdit._id,
      name: roleEdit.name,
      permissions: selected
    }))
  }

  // Role delete
  const handleRoleDelete = (id) => {
    swal({
      title: "Delete Role",
      text: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Role Deleted Successfull!", {
          icon: "success",
        });
        dispatch(deleteRole(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Update role status
  const handleRoleStatus = (status, id) => {
    dispatch(roleStatusUpdate({ status, id }));
  };

  // error and success msg
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

  // Data table load
  useEffect(() => {
    new DataTable(".datatable");
  });

  return (
    <>
      <PageTitle title="Role" />
      <ModalPopup target="roleModal">
        <p>
          <form onSubmit={handleRoleForm}>
            <div className="my-3">
              <div className="my-2">
                <label htmlFor=""> Name </label>
                <input
                  value={input.name}
                  onChange={handleInputChange}
                  name="name"
                  type="text"
                  className="form-control"
                />
              </div>
              <label> Permissions </label>
              {permission?.map((data, index) => {
                return (
                  <label className="d-block" key={index}>
                    <input
                      checked={selected.includes(data.name)}
                      onChange={handleCheckbox}
                      value={data.name}
                      type="checkbox"
                    />{" "}
                    {data.name}
                  </label>
                );
              })}
            </div>
            <button className="btn btn-block btn-primary" type="submit">
              Add Role
            </button>
          </form>
        </p>
      </ModalPopup>
      <ModalPopup target="roleEditModal">
        <p>
          <form onSubmit={handleRoleEditForm}>
            <div className="my-3">
              <div className="my-2">
                <label htmlFor=""> Name </label>
                <input
                  value={roleEdit.name}
                  onChange={handleRoleEditChange}
                  name="name"
                  type="text"
                  className="form-control"
                />
              </div>
              <label> Permissions </label>
              {permission?.map((data, index) => {
                return (
                  <label className="d-block" key={index}>
                    <input
                      checked={selected?.includes(data.name)}
                      onChange={handleCheckbox}
                      value={data.name}
                      type="checkbox"
                    />{" "}
                    {data.name}
                  </label>
                );
              })}
            </div>
            <button className="btn btn-block btn-primary" type="submit">
              Add Role
            </button>
          </form>
        </p>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#roleModal"
            data-toggle="modal"
            className="btn btn-primary mb-3"
          >
            {" "}
            Add New Role
          </button>
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body" style={{ padding: "20px" }}>
              <div className="table-responsive">
                {role && (
                  <table className="datatable datatablepermission table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permission</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role]?.reverse().map((data, index) => {
                        return (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {data.name} </td>
                            <td> {data.slug} </td>
                            <td>
                              <ul>
                                {data.permissions.map((data, index) => {
                                  return <li key={index}> {data} </li>;
                                })}
                              </ul>
                            </td>
                            <td> {timeago(new Date(data.createdAt))} </td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={data.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handleRoleStatus(data.status, data._id)
                                  }
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
                                onClick={() => handleRoleEdit(data._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="trash-botton"
                                onClick={() => handleRoleDelete(data._id)}
                              >
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

export default Role;
