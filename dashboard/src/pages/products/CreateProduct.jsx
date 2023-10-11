import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import Select from 'react-select'

const CreateProduct = () => {
  const [longDesc, setLongDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [productType, setProductType] = useState("Simple Product");
  const editor = useRef(null);
  const { category, brand, tag } = useSelector((state) => state.product);

    // tag options
    let tagOptions = []
    tag?.forEach((data) => {
        tagOptions.push({value: data._id, label:data.name})
    })

  return (
    <>
      <PageTitle title="Add New Product" />
      <div className="row">
        <div className="col-md-12">
          <Link to="/product" className="btn btn-primary mb-3">
            All Products
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title">Add Product Information</h4>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Product Name
                  </label>
                  <div className="col-lg-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Product Type
                  </label>
                  <div className="col-lg-9">
                    <select
                      name=""
                      id=""
                      className="form-control"
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      <option value="Simple Product"> Simple Product </option>
                      <option value="Variable Product">Variable Product</option>
                      <option value="External Product">
                        {" "}
                        External Product{" "}
                      </option>
                      <option value="Grouped Product"> Grouped Product </option>
                    </select>
                  </div>
                  {productType === "Simple Product" && (
                    <>
                      <div
                        style={{
                          backgroundColor: "#EEEEEE",
                          padding: "10px 20px",
                          width: "100%",
                          margin: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label"
                          >
                            Regular Price
                          </label>
                          <div className="col-lg-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label"
                          >
                            Sale Price
                          </label>
                          <div className="col-lg-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label textColor"
                          >
                            Product Photos
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="file"
                              className="form-control"
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {productType === "Variable Product" && <>Variable Products</>}
                  {productType === "External Product" && (
                    <>
                      <div
                        style={{
                          backgroundColor: "#EEEEEE",
                          padding: "10px 20px",
                          width: "100%",
                          margin: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label"
                          >
                            Regular Price
                          </label>
                          <div className="col-lg-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label"
                          >
                            Sale Price
                          </label>
                          <div className="col-lg-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label"
                          >
                            Product Links
                          </label>
                          <div className="col-lg-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            style={{ color: "#19C1DC" }}
                            className="col-lg-3 col-form-label textColor"
                          >
                            Product Photos
                          </label>
                          <div className="col-lg-9">
                            <input
                              type="file"
                              className="form-control"
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {productType === "Grouped Product" && <>Grouped</>}
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Short Description
                  </label>
                  <div className="col-lg-9">
                    <JoditEditor
                      ref={editor}
                      value={shortDesc}
                      onChange={(newContent) => {
                        setShortDesc(newContent);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Product Description
                  </label>
                  <div className="col-lg-9">
                    <JoditEditor
                      ref={editor}
                      value={longDesc}
                      onChange={(newContent) => {
                        setLongDesc(newContent);
                      }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title">Product Data</h4>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Product Categories
                  </label>
                  <div style={{display:"flex", flexWrap:"wrap", width:"33.3%"}} className="col-lg-9">
                    {category?.map((pCat, i) => {
                      return (
                        <div style={{width:"33.3%"}} key={i}>
                          <label className="d-block">
                            <input type="checkbox" value={pCat._id} /> &nbsp;{" "}
                            {pCat.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Product Brands
                  </label>
                  <div className="col-lg-9">
                    <select name="" id="" className="form-control">
                        {
                            brand?.map((pBrand, i) => {
                                return(
                                    <option key={i} value={pBrand._id}> {pBrand.name} </option>
                                )
                            })
                        }
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Product tags
                  </label>
                  <div className="col-lg-9">
                  <Select options={tagOptions} isMulti />
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
