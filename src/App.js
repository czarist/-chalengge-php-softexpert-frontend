import { Routes, Route, Link } from "react-router-dom";
import { IndexProvider } from "./Context/IndexContext";

import { Home } from "./components/Home";

import { ProductIndex } from "./components/product/ProductIndex";
import { ProductCreate } from "./components/product/ProductCreate";
import { ProductEdit } from "./components/product/ProductEdit";

import { TaxIndex } from "./components/tax/TaxIndex";
import { TaxCreate } from "./components/tax/TaxCreate";
import { TaxEdit } from "./components/tax/TaxEdit";

import 'bootstrap/dist/css/bootstrap.min.css';


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
                <Link to="/Products" style={{ color: "white", textDecoration: "none !important" }}>Products</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/Products" style={{ color: "white", textDecoration: "none !important" }}>Taxes</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/Products" style={{ color: "white", textDecoration: "none !important" }}>Categories</Link>
              </li>

              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/Products" style={{ color: "white", textDecoration: "none !important" }}>Cart</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Products" element={<ProductIndex />} />
            <Route path="/Products/create" element={<ProductCreate />} />
            <Route path="/Products/:id/edit" element={<ProductEdit />} />
          </Routes>
        </div>
      </div>
    </IndexProvider>
  );
}

export default App;
