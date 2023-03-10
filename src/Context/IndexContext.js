import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080/api/";

const IndexContext = createContext();

const productForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  tax_id: "",
  img: "",
};

export const IndexProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(productForm);
  const [Products, setProducts] = useState([]);
  const [Product, setProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getProducts = async () => {
    const response = await fetch(`${baseURL}products`);
    const data = await response.json();
    setProducts(data);
  };

  const getProduct = async (id) => {
    const response = await fetch(`${baseURL}products/${id}`);
    const data = await response.json();
    setProduct(data);
    setFormValues({
      name: data.name,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
      tax_id: data.tax_id,
      img: data.img
    });
  };

  const storeProduct = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
      const urlencoded = new URLSearchParams();

      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      Object.entries(formValues).forEach((entry) => {
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

      setFormValues(productForm);
      navigate("/products");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };
  
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
      const urlencoded = new URLSearchParams();

      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      Object.entries(formValues).forEach((entry) => {
        const [key, value] = entry;
        urlencoded.append(key, value);
      });

      console.log(formValues);

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

      setFormValues(productForm);

      window.confirm("successfully updated")

      navigate("/products");

    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure")) {
      return;
    }
    await fetch(`${baseURL}products/${id}`, {
      method: "DELETE",
    });
    getProducts();
    navigate("/products");
  };

  return (
    <IndexContext.Provider
      value={{
        Product,
        Products,
        getProduct,
        getProducts,
        onChange,
        formValues,
        storeProduct,
        errors,
        setErrors,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};

export default IndexContext;
