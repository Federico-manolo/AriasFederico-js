'use client';

import {Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartasDelPedido from "./modal_cartas_pedido";
import PedidosListados from "./pedidos_listados";
import axios from "axios";
import {deleteCookieAuth} from "../service_autentificacion/AuthController";
import Item from "../Components/Item";
import CustomNavbar from "../Components/Navbar";

export default function ClientOrders(){
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

    const NO_RESULTS_PEDIDOS= "No existen pedidos asociados a este usuario";
    const router = useRouter();
    const [pedidosUsuario, setPedidosUsuario] = useState([]);
    const [noOrdersMessage, setNoOrdersMessage] = useState("");
    const [modalCartasPedido, setModalCartasPedido] = useState({});
    const [enable, setEnable] = useState(false);

    function handleShowModal(cartasPedido: any){
        setEnable(true);
        setModalCartasPedido(cartasPedido);
    }

    //Consulta a la api del usuario logueado.
    function showOrders(){
        axios.get('https://cyber-strikers-coachvach.vercel.app/rest/pedidosUsuario',
        {
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem("auth_token")
            }
        }).then(response =>{
            console.log("HOLA")
            const pedidos = response.data;
            console.log(pedidos);
            setPedidosUsuario(pedidos);
            if(pedidos.length == 0){
                setNoOrdersMessage(NO_RESULTS_PEDIDOS);
            } else{
                setNoOrdersMessage("");
            }
        }).catch( error => {
            console.log(error);
            if(error.response.status === 401){
                deleteCookieAuth();     
                router.push('/login');
            }
        });
    }

    useEffect(()=>showOrders(),[]);

    
    return (
        <>
            <CustomNavbar
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
        />
            <Container>
                <h1 className='antiquewhite-05 text-center'> Mis Pedidos </h1>
                <PedidosListados pedidosUsuario={pedidosUsuario} showOrderPopup={handleShowModal}></PedidosListados>
                {(noOrdersMessage == NO_RESULTS_PEDIDOS)?(
                    <h3>{NO_RESULTS_PEDIDOS}</h3>
                ):(
                    null
                )}
            </Container>
            <CartasDelPedido cartas_pedido={modalCartasPedido} enable={enable} handleClose={() => setEnable(false)}></CartasDelPedido>
        </>
    );
}