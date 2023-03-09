import { useContext, useEffect, useState } from "react";
import ProductContext from "../../Context/ProductContext";

export const ProductCreate = () => {

  const { formValues, onChange, storeProduct, errors, setErrors } =
    useContext(ProductContext);
  useEffect(() => {
    setErrors({});
  },
    []);

  const [image, setImage] = useState('');

  const convert2base64 = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  }

  function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    event.simulated = true;
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  let input = document.getElementById('img');

  if (image) {
    setNativeValue(input, image);
  }

  return (
    <div className="mt-12">
      <form
        onSubmit={storeProduct}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div className="mb-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="name"
              value={formValues["nome"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.nome && (
              <span className="text-sm text-red-400">{errors.nome[0]}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium">
              Description
            </label>

            <input
              name="description"
              value={formValues["description"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.description && (
              <span className="text-sm text-red-400">{errors.description[0]}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="category_id" className="block mb-2 text-sm font-medium">
              Category
            </label>
            <input
              name="category_id"
              value={formValues["category_id"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.category_id && (
              <span className="text-sm text-red-400">{errors.category_id[0]}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="price" className="block mb-2 text-sm font-medium">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={formValues["price"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.price && (
              <span className="text-sm text-red-400">{errors.price[0]}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="tax_id" className="block mb-2 text-sm font-medium">
              Tax
            </label>
            <input
              name="tax_id"
              type="number"
              value={formValues["tax_id"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.price && (
              <span className="text-sm text-red-400">{errors.price[0]}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="img" className="block mb-2 text-sm font-medium">
              Image
            </label>

            <input
              style={{ display: 'none' }}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
              name="img" id="img" onChange={onChange}
            />

            <input
              id="imagem"
              name="imagem"
              type="file"
              accept="image/*"
              onChange={e => convert2base64(e)}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {image ? (
              <img src={image} />
            ) : (
              ''
            )}
            {errors.img && (
              <span className="text-sm text-red-400">{errors.img[0]}</span>
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
