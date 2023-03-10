import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080/api/";

const IndexContext = createContext();
const myHeaders = new Headers();
const urlencoded = new URLSearchParams();

myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const productForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  tax_id: "",
  img: "",
};

const taxForm = {
  name: "",
  rate: "",
};

const categoryForm = {
  name: "",
  description: "",
};

export const IndexProvider = ({ children }) => {
  const [productValues, setProductValues] = useState(productForm);
  const [Products, setProducts] = useState([]);
  const [Product, setProduct] = useState([]);

  const [taxValues, setTaxValues] = useState(taxForm);
  const [Taxes, setTaxes] = useState([]);
  const [Tax, setTax] = useState([]);

  const [categoriesValues, setCategoryValues] = useState(categoryForm);
  const [Categories, setCategories] = useState([]);
  const [Category, setCategory] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProductValues({ ...productValues, [name]: value });
    setTaxValues({ ...taxValues, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Get lists of elements

  const getProducts = async () => {
    const response = await fetch(`${baseURL}products`);
    const data = await response.json();
    setProducts(data);
  };

  const getTaxes = async () => {
    const response = await fetch(`${baseURL}taxes`);
    const data = await response.json();
    setTaxes(data);
  };

  const getCategories = async () => {
    const response = await fetch(`${baseURL}categories`);
    const data = await response.json();
    setCategories(data);
  };

  // Get Item by ID 

  const getProduct = async (id) => {
    const response = await fetch(`${baseURL}products/${id}`);
    const data = await response.json();
    setProduct(data);
    setProductValues({
      name: data.name,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
      tax_id: data.tax_id,
      img: data.img
    });
  };

  const getTax = async (id) => {
    const response = await fetch(`${baseURL}taxes/${id}`);
    const data = await response.json();
    setTax(data);
    setTaxValues({
      name: data.name,
      rate: data.rate
    });
  };

  // create items

  const storeProduct = async (e) => {
    e.preventDefault();

    try {

      Object.entries(productValues).forEach((entry) => {
        const [key, value] = entry;
        urlencoded.append(key, value);
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${baseURL}products`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setProductValues(productForm);
      navigate("/products");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  // updated items

  const updateProduct = async (e) => {
    e.preventDefault();

    try {

      Object.entries(productValues).forEach((entry) => {
        const [key, value] = entry;
        urlencoded.append(key, value);
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${baseURL}products/${Product.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setProductValues(productForm);

      window.confirm("successfully updated")

      navigate("/products");

    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const updateTax = async (e) => {
    e.preventDefault();

    try {
      Object.entries(taxValues).forEach((entry) => {
        const [key, value] = entry;
        urlencoded.append(key, value);
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${baseURL}taxes/${Tax.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setTaxValues(taxForm);

      window.confirm("successfully updated")

      navigate("/taxes");

    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };


  // Delete items

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    await fetch(`${baseURL}products/${id}`, {
      method: "DELETE",
    });
    getProducts();
    navigate("/products");
  };

  const deleteTax = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    await fetch(`${baseURL}taxes/${id}`, {
      method: "DELETE",
    });
    getTaxes();
    navigate("/taxes");
  };

  return (
    <IndexContext.Provider
      value={{
        Product,
        Products,
        getProduct,
        getProducts,
        onChange,
        productValues,
        storeProduct,
        errors,
        setErrors,
        updateProduct,
        deleteProduct,
        getTaxes,
        getTax,
        Taxes,
        Tax,
        updateTax,
        deleteTax,
        taxValues,
        getCategories,
        categoriesValues,
        Categories,
        Category
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};

export default IndexContext;
