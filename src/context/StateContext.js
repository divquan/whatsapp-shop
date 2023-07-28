import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

// Retrieve cartItems from local storage on component mount
const getStoredCartItems = () => {
  try {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    console.error('Error retrieving cartItems from localStorage:', error);
    return [];
  }
};

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(getStoredCartItems);
  const [qty, setQty] = useState(1);
  

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cartItems to localStorage:', error);
    }
  }, [cartItems]);

  const onAdd = (product, quantity, color, size) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
            color,
            size,
          };
        }
        return cartProduct; // Return the original cartProduct when no update is needed
      });

      setCartItems(updatedCartItems);
    } else {
      const newItem = {
        ...product,
        quantity,
        color,
        size,
      };
      setCartItems([...cartItems, newItem]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    const foundProduct = cartItems.find((item) => item.id === product.id);
    if (!foundProduct) return; // Return early if the product is not found

    setCartItems(newCartItems);
  };  

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else if (value === 'dec' && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
      }
      return item;
    });
  
    setCartItems(updatedCartItems);
  };
  

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
