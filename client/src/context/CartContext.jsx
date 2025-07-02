import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/cart", {
          credentials: "include",
        });
        const data = await res.json();
        setCartItems(data.data.cart.items);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      const data = await res.json();
      setCartItems(data.data.cart.items);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/cart/item", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      setCartItems(data.data.cart.items);
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/cart", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      setCartItems(data.data.cart.items);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  const increaseQuantity = async (product) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (existingItem && existingItem.quantity < product.countInStock) {
      await addToCart(product, 1);
    }
  };

  const decreaseQuantity = async (product) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (!existingItem) return;

    if (existingItem.quantity > 1) {
      try {
        const res = await fetch("http://localhost:3000/api/v1/cart", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: -1,
          }),
        });

        const data = await res.json();
        setCartItems(data.data.cart.items);
      } catch (err) {
        console.error("Decrease quantity error:", err);
      }
    } else {
      removeFromCart(product._id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
