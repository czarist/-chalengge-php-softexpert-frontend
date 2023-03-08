import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8080/api/";

const ProductContext = createContext();

const initialForm = {
  nome: "",
  marca: "",
  modelo: "",
  valor: "",
  foto: "",
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
    const apiProducts = await axios.get("Products");
    setProducts(apiProducts.data.data);
  };

  const getProduct = async (id) => {
    const response = await axios.get("Products/" + id);
    const apiProduct = response.data.data;
    setProduct(apiProduct);
    setFormValues({
      nome: apiProduct.nome,
      marca: apiProduct.marca,
      modelo: apiProduct.modelo,
      valor: apiProduct.valor,
      foto: apiProduct.foto
    });
  };

  const storeProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.Product("Products", formValues);
      setFormValues(initialForm);
      navigate("/Products");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put("Products/" + Product.id, formValues);
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
    await axios.delete("Products/" + id);
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
