"use client";
import React, { useEffect, useState } from 'react';
import {  Card, Container } from 'react-bootstrap';
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import Item from './Item';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

type CheckoutProps = {
};

const Checkout: React.FC<CheckoutProps> = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const router = useRouter();
  const [monto, setMonto] = useState(Number);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
      setMonto(0);
      montoTotal(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    initMercadoPago('TEST-f8952d8c-1e05-4064-814e-c57d2ed66f02');
  }, []);

  const montoTotal = async (items: any[]) => {
    try {
      const pedidoData = {
        estado: 'Pendiente',
        fecha_pedido: new Date().toISOString(),
        fecha_entrega: new Date().toISOString(), 
        user_id: localStorage.getItem("user_id"), // Replace with the actual user ID
        cartas: items.map(item => ({
          id: item.id,
          cant_producto: item.cant_producto
        })),
      };
      const response = await axios.post('https://cyber-strikers-coachvach.vercel.app/rest/montoTotal', pedidoData,
      {
        headers:{
            'Authorization': 'Bearer '+localStorage.getItem("auth_token")
        }
      });
      if (response.status === 200) {
        setMonto(response.data.monto_total);
        initialization = {
          amount: monto, // Adjust the appropriate amount for the order
        };

      } else if (response.status === 419 || response.status === 401){
        console.log('Ha ocurrido un problema con la sesión, debemos volver a iniciar');
        router.push('/login');
      }else {
        console.error('Error al calcular el monto:', response.status);
      }
      
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Handle errors if an error occurs during the request
    }
  };

  var initialization = {
    amount: monto, // Adjust the appropriate amount for the order
  };

  const realizarPedido = async () => {
    console.log("Realizando pedido")
    try {
      const confirmed = window.confirm('Are you sure you want to place the order?');

      if (confirmed) {
        const pedidoData = {
          estado: 'Pendiente',
          fecha_pedido: new Date().toISOString(),
          fecha_entrega: new Date().toISOString(), 
          user_id: localStorage.getItem("user_id"), // Replace with the actual user ID
          cartas: cartItems.map(item => ({
            id: item.id,
            cant_producto: item.cant_producto
          })),
        };
        const response = await axios.post('https://cyber-strikers-coachvach.vercel.app/rest/cargarPedido', pedidoData,
        {
          headers:{
              'Authorization': 'Bearer '+localStorage.getItem("auth_token")
          }
        });
        if (response.status === 201) {
          setCartItems([]);
          console.log('Pedido creado correctamente:', response.data.message);
          toast.success('Pedido creado correctamente'); // Notificación de éxito
          window.location.href = '/pedidosUsuario';
        } else if (response.status === 419 || response.status === 401){
          console.log('Ha ocurrido un problema con la sesión, debemos volver a iniciar');
          router.push('/login');
        }else {
          console.error('Error al crear el pedido:', response.status);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Handle errors if an error occurs during the request
    }
  };

  const validarPago = async (formData:any) => {
    console.log("Realizando pedido")
    const url = 'https://cyber-strikers-coachvach.vercel.app/rest/process-payment';
    const response = await axios.post(url, formData,
    {
      headers:{
          'Authorization': 'Bearer '+localStorage.getItem("auth_token")
      }
    });
    return response;
  };

  const onSubmit = async (formData: any) => {
    return new Promise<void>((resolve, reject) => {
      try{
        validarPago(formData).then( response => {
          console.log("Return mp: "+response.data.status);
          if(response.data.status == "approved"){
            realizarPedido();
            toast.success('Pedido Realizado (='); // Notificación de éxito
          }else{
            toast.error('Pedido Rechazado )='); // Notificación de éxito
            setTimeout(() => {
              window.location.href = "/pedido"; // Redireccionar a la página "/pedidos"
            }, 4000); // 2000 milisegundos (2 segundos)
          }
        });
      
      } catch(error){
        console.log(error);
      }
      
    });
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    console.log('READY');
  };

  const total = () => {
    let sum = 0;
    cartItems.forEach(item => {
      sum += item.costo * item.cant_producto;
    });
    return sum;
  };
  

  return (
    <div className="checkout-container">
      <ToastContainer />
      <Container>
        <h1> Realice su pago:</h1>
      {cartItems.map(item => (
          <Card key={item.id} className="card mb-3">
            <Card.Body>
              <Card.Title>{item.jugador.nombre} {item.jugador.apellido}</Card.Title>
              <Card.Text>{item.jugador.equipo.ciudad} {item.jugador.equipo.nombre}</Card.Text>
              <Card.Text className="costo">{item.costo}$</Card.Text>
              <div className="quantity">
                <span className="cant-producto">{item.cant_producto}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
        <h1> Monto Total: ${total()}</h1>
        {(monto>0)?(
        <CardPayment
          initialization={initialization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />):(
          null
        )}
      </Container>
    </div>
  );
};

export default Checkout;
