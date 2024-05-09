"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CartaContainer from './CartaContainer';
import Item from './Item'
import CustomNavbar from './Navbar';
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ItemProps = {
  apiCall: (...args:any[]) => Promise<Item[]>;
  name: string;
  infiniteScroll:boolean;
};

const countryCode: { [key: string]: string } = {
  'Guinea': 'GN',
  'Turkey': 'TR',
  'Nigeria': 'NG',
  'Switzerland': 'CH',
  'New Zealand': 'NZ',
  'Italy': 'IT',
  'Cameroon': 'CM',
  'Czech Republic': 'CZ',
  'USA': 'US',
  'St. Lucia': 'LC',
  'United Kingdom': 'GB',
  'Montenegro': 'ME',
  'Brazil': 'BR',
  'Austria': 'AT',
  'Dominican Republic': 'DO',
  'Australia': 'AU',
  'Germany': 'DE',
  'Serbia': 'RS',
  'Macedonia': 'MK',
  'Canada': 'CA',
  'Angola': 'AO',
  'Portugal': 'PT',
  'Finland': 'FI',
  'Ukraine': 'UA',
  'Lithuania': 'LT',
  'Spain': 'ES',
  'Croatia': 'HR',
  'Latvia': 'LV',
  'England': 'GB',
  'Sudan': 'SD',
  'Congo': 'CG',
  'Slovenia': 'SI',
  'Greece': 'GR',
  'Bahamas': 'BS',
  'Georgia': 'GE',
  'Belgium': 'BE',
  'France': 'FR',
  'Israel': 'IL',
  'Senegal': 'SN',
  'Yugoslavia': 'US',
  'Japan': 'JP',
  'Bosnia and Herzegovina': 'BA',
  'Jamaica': 'JM',
  'DR Congo': 'CD',
};



const ItemListComponent: React.FC<ItemProps> = ({apiCall,name,infiniteScroll}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [cartItems, setCartItems] = useState<Item[]>([]);
  //Contante de paginas
  const [page, setPage] = useState(1);
  //Logo loading
  const [loading, setLoading] = useState(true);

  const getCountryFlagUrl = (country: string) => {
    const countryShortCode = countryCode[country]
    return `https://flagsapi.com/${countryShortCode}/shiny/64.png`;
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await apiCall(name, page, 6);
        setItems((prev) =>{
          return [...prev, ...apiData]
        });
        setLoading(false);
      } catch (error) {
      }
    };
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true);
      setPage(prev  => prev + 1);
    }

  }
  if(infiniteScroll){
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return() => window.removeEventListener("scroll", handleScroll); 
    },[])
  }

  const addToCart = (item: Item, quantity: number) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (!existingItem) {
      item.cant_producto = quantity;
      setCartItems((prevItems) => [...prevItems, item]);
      toast.success('Carta añadida al Carrito (='); // Notificación de éxito
    } else {
      toast.error('Ya tienes esta carta en el Carrito.'); // Notificación de error
    }
  };

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
      <ToastContainer />
      <CustomNavbar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
      <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <CartaContainer item={item} addToCart={addToCart} imgPais={getCountryFlagUrl(item.jugador.nacionalidad)} />
          </Col>
        ))}
      </Row>
      {loading && <Loader/>}
    </div>
    
  );
};

export default ItemListComponent;
