import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import IndexContext from "../../Context/IndexContext";

export const SaleCreate = () => {

  const {
    productsCart,
    addProducToCart,
    removeProductToCart,
    clearCart,
    finalPrice,

  } = useContext(CartContext);

  const {
    saleValues,
    onChange,
    storeSale,
    Products,
    getProducts,
    setSaleValues
  } =
    useContext(IndexContext);


  const clearSaleValues = () => {
    setSaleValues(saleValues => ({
      ...saleValues,
      total_value: 0,
      items_list: []
    }));
  }

  function updateSaleValues(newTotalValue, newItemsList) {
    setSaleValues({
      buyer_name: saleValues["buyer_name"],
      buyer_cpf: saleValues["buyer_cpf"],
      total_value: newTotalValue,
      items_list: newItemsList
    });
  }

  useEffect(() => {
    getProducts();

    async function updateSale() {
      clearSaleValues();
      updateSaleValues(finalPrice, JSON.stringify(productsCart))
    }

    updateSale();
  }, [saleValues.items_list, saleValues.total_value, finalPrice, productsCart]);
  return (
    <div className="mt-12">

      <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-sm">
        <div className="row">
          <div className="col-6">
            <div className="space-y-6">
              <div>
                <button className="mb-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md" onClick={() => { clearSaleValues(); clearCart(); }}>Clear Cart</button>
                {Products.map((product) => (
                  <div className="cart d-flex mb-2" key={product.id}>
                    <div className="container">
                      <h6>{product.name}</h6>
                      <h6>${product.price},00</h6>
                      <h3>
                        {productsCart.find((item_obj) => item_obj.item_id === product.id)?.quantity
                          ? productsCart.find((item_obj) => item_obj.item_id === product.id)?.quantity
                          : 0}
                      </h3>
                      <button type="button" className="btn btn-success" onClick={() => {
                        addProducToCart(product.id);
                        updateSaleValues(finalPrice, JSON.stringify(productsCart));
                      }}>+</button>

                      <button type="button" className="btn btn-danger" onClick={() => {
                        removeProductToCart(product.id);
                        updateSaleValues(finalPrice, JSON.stringify(productsCart));
                      }}>-</button>                    </div>
                    <img src={product.img} width={200} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <form
              onSubmit={storeSale}>
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

                </div>
                <div className="mb-2">
                  <label htmlFor="buyer_cpf" className="block mb-2 text-sm font-medium">
                    CPF
                  </label>

                  <input
                    name="buyer_cpf"
                    type="number"
                    value={saleValues["buyer_cpf"]}
                    onChange={onChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  />

                </div>
                <div className="mb-2">

                  <input
                    name="items_list"
                    id="items_list"
                    type="text"
                    value={saleValues["items_list"]}
                    onChange={onChange}
                    className="border d-none border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  />


                </div>
                <div className="mb-2">
                  <input
                    name="total_value"
                    id="total_value"
                    type="text"
                    value={saleValues["total_value"]}
                    onChange={onChange}
                    className="border d-none border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  />


                </div>
              </div>
              <h4><b>${saleValues["total_value"]}</b></h4>
              <div className="my-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md"
                >
                  Buy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >

  );
};
