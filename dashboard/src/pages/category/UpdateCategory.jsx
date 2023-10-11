import { useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup"
import useFormFields from "../../hooks/useFormFields";
import { photoChange } from "../../utlis/tools";


const UpdateCategory = ({categoryEdit, modal}) => {
    const { input, handleInputChange, formEmpty, setInput } = useFormFields({
        name: "",
        icon: "",
        parent: "",
        photo: null,
        logo: null
    });
    const { loader, category } = useSelector(
    (state) => state.product
    );

    const handleEditLogoPrev = (e) => {
        photoChange(setInput, e)
    }
  return (
    <ModalPopup target="categorydEditModal">
    <form onSubmit={modal}>
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
        <select name="parentCategory" value={input.parent}  onChange={handleInputChange}  className="form-control">
          <option value=""> {input.parentCategory?.name ? input.parentCategory?.name : "-select-"} </option>
          {
            category?.map((item, index) => {
              return (
                <option key={index} value={item._id}>{item.name}</option>
              )
            })
          }
        </select>
      </div>
        <div className="my-3">
          <img style={{ width: "100%" }} src={input.photo} alt="" />
        </div>
      <div className="my-3">
        <label>Category Photo</label>
        <input
          name="catPhoto"
          type="file"
          className="form-control"
          onChange={(e) => handleEditLogoPrev(e)}
        />
      </div>

      <div className="my-3">
        <button className="btn btn-primary btn-block">
          {loader ? "Creating Category . . ." : "Add New Category"}
        </button>
      </div>
    </form>
  </ModalPopup>
  )
}

export default UpdateCategory
