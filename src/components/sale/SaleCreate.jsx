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
    getProducts
  } =
    useContext(IndexContext);

  useEffect(() => {
    getProducts();
  }, []);

  const [theFinalValue, setTheFinalValue] = useState('');
  const [theList, setTheList] = useState('');
  const [breaker, setBreaker] = useState(true);

  const total_value = document.getElementById("total_value");
  const items_list = document.getElementById("items_list");

  async function setNativeValue(element, value) {
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

  if (productsCart) {
    setNativeValue(items_list, productsCart);
  }

  if (finalPrice) {
    setNativeValue(total_value, finalPrice);
  }



  return (
    <div className="mt-12">
      <p>{JSON.stringify(productsCart)}</p>
      <p>{finalPrice}</p>
      <div
        className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="row">
          <div className="col-6">
            <div className="space-y-6">
              <div>
                <button className="mb-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md" onClick={clearCart}>Clear Cart</button>
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
                      <button type="button" className="btn btn-success" onClick={() => addProducToCart(product.id)}>+</button>
                      <button type="button" className="btn btn-danger" onClick={() => removeProductToCart(product.id)}>-</button>
                    </div>
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
                    value={saleValues["rate"]}
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  />


                </div>
                <div className="mb-2">
                  <input
                    name="total_value"
                    id="total_value"
                    type="text"
                    value={saleValues["total_value"]}
                    onChange={onChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  />


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
          </div>
        </div>
      </div>


    </div >

  );
};
