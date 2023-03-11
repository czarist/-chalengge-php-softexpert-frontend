import { useContext, useEffect, useState } from "react";
import IndexContext from "../../Context/IndexContext";

export const SaleCreate = () => {

  const { saleValues, onChange, storeSale, errors, setErrors } =
    useContext(IndexContext);
  useEffect(() => {
    setErrors({});
  },
    []);


  return (
    <div className="mt-12">
      <form
        onSubmit={storeSale}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div className="mb-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="name"
              value={saleValues["name"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.name && (
              <span className="text-sm text-red-400">{errors.name[0]}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="rate" className="block mb-2 text-sm font-medium">
              Rate
            </label>

            <input
              name="rate"
              type="number"
              value={saleValues["rate"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.rate && (
              <span className="text-sm text-red-400">{errors.rate[0]}</span>
            )}
          </div>
        </div>
        <div className="my-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md"
          >
            Store
          </button>
        </div>
      </form>
    </div>
  );
};
