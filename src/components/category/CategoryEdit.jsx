import { useContext, useEffect, useState } from "react";
import IndexContext from "../../Context/IndexContext";
import { useParams } from "react-router-dom";

export const CategoryEdit = () => {
  const {
    categoryValues,
    onChange,
    errors,
    setErrors,
    getCategory,
    updateCategory,
  } = useContext(IndexContext);

  let { id } = useParams();

  useEffect(() => {
    getCategory(id);
    setErrors({});
  }, []);

  return (
    <div className="mt-12">
      <form
        onSubmit={updateCategory}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="name"
              value={categoryValues["name"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.name && (
              <span className="text-sm text-red-400">{errors.name[0]}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium">
              Description
            </label>
            <input
              name="description"
              value={categoryValues["description"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.description && (
              <span className="text-sm text-red-400">{errors.description[0]}</span>
            )}
          </div>

        </div>
        <div className="my-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
