import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IndexContext from "../../Context/IndexContext";

export const CategoryIndex = () => {
  const { Categories, getCategories, deleteCategory } = useContext(IndexContext);

  useEffect(() => {
    getCategories();

  }, []);


  return (
    <div className="mt-12">
      <div className="flex justify-end m-2 p-2">
        <Link
          to="/categories/create"
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          New Category
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
                Created
              </th>
              <th scope="col" className="py-3 px-6">
                Modified
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((Category) => {
              return (
                <tr
                  key={Category.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{Category.name}</td>
                  <td className="py-4 px-6">{Category.description}</td>
                  <td className="py-4 px-6">{Category.created}</td>
                  <td className="py-4 px-6">{Category.modified}</td>

                  <td className="py-4 px-6 space-x-2">
                    <Link
                      to={`/Categories/${Category.id}/edit`}
                      className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCategory(Category.id)}
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
