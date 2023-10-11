import { Link } from "react-router-dom"
import PageTitle from "../../components/PageTitle/PageTitle"
import './Product.css'

const Product = () => {
  return (
    <>
     <PageTitle title="Product" />
     <div className="row">
        <div className="col-md-12">
          <Link
            to="/create-product"
            className="btn btn-primary mb-3"
          >
            {" "}
            Add New Product
          </Link>
        </div>
      </div>
      <br />
      <br />
    </>
  )
}

export default Product
