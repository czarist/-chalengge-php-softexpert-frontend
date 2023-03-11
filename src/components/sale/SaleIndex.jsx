import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IndexContext from "../../Context/IndexContext";

export const SaleIndex = () => {
  const { Sales, getSales, deleteSale } = useContext(IndexContext);

  useEffect(() => {
    getSales();
  }, []);
  return (
    <div className="mt-12">
      
      <div className="overflow-x-auto relative" bis_skin_checked="1">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-black dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="py-3 px-6">
                Buyer
              </th>
              <th scope="col" className="py-3 px-6">
                CPF
              </th>
              <th scope="col" className="py-3 px-6">
                Purchase Date
              </th>
              <th scope="col" className="py-3 px-6">
                Items
              </th>
              <th scope="col" className="py-3 px-6">
                Total Value
              </th>
              <th scope="col" className="py-3 px-6">
              </th>
            </tr>
          </thead>
          <tbody>
            {Sales.map((sale) => {
              return (
                <tr
                  key={sale.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{sale.buyer_name}</td>
                  <td className="py-4 px-6">{sale.buyer_cpf}</td>
                  <td className="py-4 px-6">{sale.purchase_date}</td>
                  <td className="py-4 px-6">
                    <ul>
                      {
                        sale.items_list.map(
                          (item) => {
                            return (
                              <li>
                                <span>{item.item}</span>
                              </li>
                            )
                          }
                        )
                      }
                    </ul>
                  </td>
                  <td className="py-4 px-6">R$ {sale.total_value}</td>

                  <td className="py-4 px-6 space-x-2">
                    <button
                      onClick={() => deleteSale(sale.id)}
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
