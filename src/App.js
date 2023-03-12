import { Routes, Route, Link } from "react-router-dom";
import { IndexProvider } from "./Context/IndexContext";
import { CartContext } from "./Context/CartContext";

import { Home } from "./components/Home";

import { ProductIndex } from "./components/product/ProductIndex";
import { ProductCreate } from "./components/product/ProductCreate";
import { ProductEdit } from "./components/product/ProductEdit";

import { TaxIndex } from "./components/tax/TaxIndex";
import { TaxCreate } from "./components/tax/TaxCreate";
import { TaxEdit } from "./components/tax/TaxEdit";

import { CategoryIndex } from "./components/category/CategoryIndex";
import { CategoryCreate } from "./components/category/CategoryCreate";
import { CategoryEdit } from "./components/category/CategoryEdit";

import { SaleIndex } from "./components/sale/SaleIndex";
import { SaleCreate } from "./components/sale/SaleCreate";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {

  return (
    <IndexProvider>
      <div className="bg-slate-200">
        <div className="mx-auto min-h-screen">
          <nav className="navbar navbar-dark bg-dark">
            <ul className="flex">
              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/" style={{ color: "white", textDecoration: "none !important" }}>Home</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/products" style={{ color: "white", textDecoration: "none !important" }}>Products</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/taxes" style={{ color: "white", textDecoration: "none !important" }}>Taxes</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/categories" style={{ color: "white", textDecoration: "none !important" }}>Categories</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/sales" style={{ color: "white", textDecoration: "none !important" }}>Sales</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white d-flex justify-content-center align-items-center">
                <Link to="/cart" style={{ color: "white", textDecoration: "none !important" }}>
                  <i className="bi bi-cart-fill"></i>
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Products routes */}

            <Route path="/products" element={<ProductIndex />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />

            {/* Taxes routes */}

            <Route path="/taxes" element={<TaxIndex />} />
            <Route path="/taxes/create" element={<TaxCreate />} />
            <Route path="/taxes/:id/edit" element={<TaxEdit />} />

            {/* Category routes */}

            <Route path="/categories" element={<CategoryIndex />} />
            <Route path="/categories/create" element={<CategoryCreate />} />
            <Route path="/categories/:id/edit" element={<CategoryEdit />} />

            {/* Sale routes */}

            <Route path="/sales" element={<SaleIndex />} />
            <Route path="/cart" element={<SaleCreate />} />

          </Routes>
        </div>
      </div>
    </IndexProvider>
  );
}

export default App;
