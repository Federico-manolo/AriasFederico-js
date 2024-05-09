"use client";
import Inicio from './Components/Inicio';
import TeamsComponent from './Components/TeamsComponent';
import CustomNavbar from './Components/Navbar';
import Item from './Components/Item';
import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import Head from 'next/head';

export default function Home() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  
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
    <>
    <Head>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
    </Head>
      <div>
        <CustomNavbar cartItems={cartItems} removeFromCart={removeFromCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
        <Inicio/>
      </div>
      <TeamsComponent/>
    </>
  );
}
