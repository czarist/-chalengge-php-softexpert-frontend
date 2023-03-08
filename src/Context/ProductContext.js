import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080/api/";

const ProductContext = createContext();

const initialForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  tax_id: "",
  img: "",
};

export const ProductProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);
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
      nome: data.nome,
      marca: data.marca,
      modelo: data.modelo,
      valor: data.valor,
      foto: data.foto
    });
  };

  const storeProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      setFormValues(initialForm);
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
      const response = await fetch(`${baseURL}products/${Product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      setFormValues(initialForm);
      navigate("/Products");
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
    await fetch(`${baseURL}Products/${id}`, {
      method: "DELETE",
    });
    getProducts();
  };

  return (
    <ProductContext.Provider
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
    </ProductContext.Provider>
  );
};

export default ProductContext;
