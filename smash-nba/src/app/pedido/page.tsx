"use client";
import React, { useEffect, useState } from 'react';
import Checkout from '../Components/Checkout';
import Item from '../Components/Item';
import CustomNavbar from '../Components/Navbar';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
    // Cargar elementos del carrito desde localStorage al cargar la página
    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    // Guardar elementos del carrito en localStorage al actualizar el carrito
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const removeFromCart = (item: Item) => {
      setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id));
    };
  
    const incrementQuantity = (item: Item) => {
      setCartItems((prevItems) => {
        return prevItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              cant_producto: cartItem.cant_producto + 1,
            };
          }
          return cartItem;
        });
      });
    };
  
    const decrementQuantity = (item: Item) => {
      setCartItems((prevItems) => {
        return prevItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              cant_producto: Math.max(cartItem.cant_producto - 1, 0),
            };
          }
          return cartItem;
        });
      });
    };
  return (
    <div>
      <CustomNavbar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;