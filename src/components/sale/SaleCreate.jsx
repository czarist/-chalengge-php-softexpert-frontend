import { useContext, useEffect, useState } from "react";
import IndexContext from "../../Context/IndexContext";
import { CartContext } from "../../Context/CartContext";

export const SaleCreate = () => {
  const {
    productsCart,
    addProducToCart,
    removeProductToCart,
    clearCart,
  } = useContext(CartContext);

  const {
    saleValues,
    onChange,
    storeSale,
    Products,
    getProducts,
    errors,
    setErrors } =
    useContext(IndexContext);

  useEffect(() => {
    setErrors({});
    getProducts();
  }, []);


  return (
    <div className="mt-12">

      <form
        onSubmit={storeSale}
        className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div className="mb-2">
            <label htmlFor="buyer_name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="buyer_name"
              value={saleValues["buyer_name"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.buyer_name && (
              <span className="text-sm text-red-400">{errors.buyer_name[0]}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="rate" className="block mb-2 text-sm font-medium">
              CPF
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
            Buy
          </button>
        </div>
      </form>
      <div
        onSubmit={storeSale}
        className="max-w-5xl mt-3 mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div>
            <button onClick={clearCart}>Limpar Carrinho</button>
            {Products.map((product) => (
              <div className="cart" key={product.id}>
                <div className="container">
                  <h2>{product.name}</h2>
                  <h3>R${product.price},00</h3>
                  <h3>
                    {productsCart.find((item) => item.id === product.id)?.qtd
                      ? productsCart.find((item) => item.id === product.id)?.qtd
                      : 0}
                  </h3>
                  <button onClick={() => addProducToCart(product.id)}>+</button>
                  <button onClick={() => removeProductToCart(product.id)}>-</button>
                </div>
                <img src={product.image} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>

  );
};
