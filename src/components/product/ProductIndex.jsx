import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { useNavigate } from 'react-router-dom'


export const ProductIndex = () => {
  const history = useNavigate();
  const { Products, getProducts, deleteProduct } = useContext(ProductContext);
  
  useEffect(() => {
    getProducts();
   
  }, []);


  return (
    <div className="mt-12">
      <div className="flex justify-end m-2 p-2">
        <Link
          to="/Products/create"
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          New Product
        </Link>
      </div>
      <div className="overflow-x-auto relative" bis_skin_checked="1">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-black dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="py-3 px-6">
                Nome
              </th>
              <th scope="col" className="py-3 px-6">
                Marca
              </th>

              <th scope="col" className="py-3 px-6">
                Modelo
              </th>
              <th scope="col" className="py-3 px-6">
                valor
              </th>
              <th scope="col" className="py-3 px-6">
                Foto
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {Products.map((Product) => {
              return (
                <tr
                  key={Product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{Product.nome}</td>
                  <td className="py-4 px-6">{Product.marca}</td>
                  <td className="py-4 px-6">{Product.modelo}</td>
                  <td className="py-4 px-6">R$ {Product.valor}</td>
                  <td className="py-4 px-6">
                    <img width={200} src={Product.foto} />
                  </td>
                  <td className="py-4 px-6 space-x-2">
                    <Link
                      to={`/Products/${Product.id}/edit`}
                      className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(Product.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
