import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IndexContext from "../../Context/IndexContext";

export const ProductIndex = () => {
  const { Products,
    getProducts,
    deleteProduct,
    Taxes,
    getTaxes,
    getCategories,
    Categories } = useContext(IndexContext);

  useEffect(() => {
    getProducts();
    getCategories();
    getTaxes();
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
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Price With no Taxes
              </th>
              <th scope="col" className="py-3 px-6">
                Tax
              </th>
              <th scope="col" className="py-3 px-6">
                Created
              </th>
              <th scope="col" className="py-3 px-6">
                Modified
              </th>
              <th scope="col" className="py-3 px-6">
                Photo
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
                  <td className="py-4 px-6">{Product.name}</td>
                  <td className="py-4 px-6">{Product.description}</td>
                  <td className="py-4 px-6">
                    {Categories.map((Category) => {
                      return (
                        Category.id == Product.category_id ? Category.name : ""
                      );
                    })}
                  </td>
                  <td className="py-4 px-6">R$ {Product.price}</td>
                  <td className="py-4 px-6">R$ {Product.price_with_no_taxes}</td>
                  <td className="py-4 px-6">
                    {Taxes.map((tax) => {
                      return (
                        tax.id == Product.tax_id ? `${tax.name} % ${tax.rate}` : ""
                      );
                    })}
                  </td>
                  <td className="py-4 px-6">{Product.created}</td>
                  <td className="py-4 px-6">{Product.modified}</td>
                  <td className="py-4 px-6">
                    <img width={200} src={Product.img} />
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
