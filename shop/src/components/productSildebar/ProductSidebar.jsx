import './ProductSidebar.css'
const ProductSidebar = () => {
  return (
    <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
    <div className="sidebar-overlay"></div>
    <a className="sidebar-close" href="#">
      <i className="close-icon"></i>
    </a>

    <div className="sidebar-content scrollable">
      <div className="sticky-sidebar">
        <div className="filter-actions">
          <label>Filter :</label>
          <a
            href="#"
            className="btn btn-dark btn-link filter-clean"
          >
            Clean All
          </a>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <span>Search</span>
          </h3>
          <div className="widget-body">
            <form className="price-range">
              <input
                type="number"
                name="search"
                placeholder="search.."
                style={{width: "100%"}}
              />
              <a href="#" className="btn btn-primary btn-rounded">
                <i className="fa fa-search"></i>
              </a>
            </form>
          </div>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <span>All Categories</span>
          </h3>
          <ul className="widget-body filter-items search-ul">
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Food</a>
            </li>
            <li>
              <a href="#">Medical</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
            <li>
              <a href="#">Watches</a>
            </li>
          </ul>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <span>All Brands</span>
          </h3>
          <ul className="widget-body filter-items search-ul">
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Food</a>
            </li>
            <li>
              <a href="#">Medical</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
            <li>
              <a href="#">Watches</a>
            </li>
          </ul>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <span>All Tags</span>
          </h3>
            <div className="tag-list">
              <a href=""> Samsung </a>
              <a href=""> Asus </a>
              <a href=""> Lenevo </a>
              <a href=""> Pluzz </a>
              <a href=""> Kstar </a>
            </div>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <span>Price</span>
          </h3>
          <div className="widget-body">
            <form className="price-range">
              <input
                type="number"
                name="min_price"
                className="min_price text-center"
                placeholder="$min"
              />
              <span className="delimiter">-</span>
              <input
                type="number"
                name="max_price"
                className="max_price text-center"
                placeholder="$max"
              />
              <a href="#" className="btn btn-primary btn-rounded">
                Go
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </aside>
  )
}

export default ProductSidebar
