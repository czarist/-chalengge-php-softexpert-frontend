import { createContext, useState } from "react";
export const CartContext = createContext();
const baseURL = "http://localhost:8080/api/";

export function CartProvider({ children }) {
    const [productsCart, setProductsCart] = useState([]);
    const [finalPrice, setfinalPrice] = useState([]);

    function sumPrices(items) {
        const total = items.reduce((accumulator, currentItem) => {
            const itemTotal = currentItem.quantity * currentItem.price;
            return accumulator + itemTotal;
        }, 0);

        return total;
    }

    async function addProducToCart(id) {
        const response = await fetch(`${baseURL}products/${id}`);
        const data = await response.json();
        const copyProductsCart = [...productsCart];
        const item_obj = copyProductsCart.find((product) => product.id === id);

        if (!item_obj) {
            copyProductsCart.push({ id: id, item_id: id, item: data.name, quantity: 1, price: data.price * 1, item_tax_id: data.tax_id });
        } else {
            item_obj.quantity = item_obj.quantity + 1;
            item_obj.price = data.price * item_obj.quantity + 1;
        }
        setfinalPrice(sumPrices(copyProductsCart))
        setProductsCart(copyProductsCart);
    }

    function removeProductToCart(id) {
        const copyProductsCart = [...productsCart];
        const item_obj = copyProductsCart.find((product) => product.id === id);

        if (item_obj && item_obj.quantity > 1) {
            item_obj.quantity = item_obj.quantity - 1;

            setfinalPrice(sumPrices(copyProductsCart))
            setProductsCart(copyProductsCart);
        } else {
            const arrayFiltered = copyProductsCart.filter(
                (product) => product.id !== id
            );
            setfinalPrice(sumPrices(arrayFiltered))
            setProductsCart(arrayFiltered);
        }

    }

    function clearCart() {
        setProductsCart([]);
        setfinalPrice([]);
    }

    return (
        <CartContext.Provider
            value={{
                finalPrice,
                productsCart,
                addProducToCart,
                removeProductToCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
