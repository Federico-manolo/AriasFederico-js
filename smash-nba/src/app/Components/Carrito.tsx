"use client";
import React, { useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import Item from './Item';
import '../StyleComponents/Carrito.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isLoggedIn} from "../service_autentificacion/AuthController";


type CarritoProps = {
  cartItems: Item[];
  removeFromCart: (item: Item) => void;
  incrementQuantity: (item: Item) => void;
  decrementQuantity: (item: Item) => void;
  enable:boolean;
  handleClose: () => void;
};

const Carrito: React.FC<CarritoProps> = ({ cartItems, removeFromCart, incrementQuantity, decrementQuantity, enable, handleClose }) => {
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    event.stopPropagation();
    removeFromCart(item);
  };

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    event.stopPropagation();
    incrementQuantity(item);
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    event.stopPropagation();
    decrementQuantity(item);
  };

  const realizarPago = () => {
    if(isLoggedIn()) {
      // Redirigir a la página de Checkout
      window.location.href = '/pedido';
    }else{
      window.location.href = '/login';  
    }
  };
  

  return (

    <Modal show={enable} onHide={handleClose} centered fullscreen="sm-down">
      <ToastContainer />
        <Modal.Header closeButton>
          <img src="/images/cart.png" alt="Image" className="img-fluid" />
          <Button variant="primary" onClick={realizarPago} className="button">
             Realizar Pedido
          </Button>
        </Modal.Header>
        <Modal.Body>
            {cartItems.map(item => (
              <Card key={item.id} className="card mb-3">
                <Card.Body>
                  <div className="card-header">
                    <Button variant="danger" onClick={(event) => handleRemove(event, item)} className="delete-button">-</Button>
                  </div>
                  <Card.Title>{item.jugador.nombre} {item.jugador.apellido}</Card.Title>
                  <Card.Text>{item.jugador.equipo.ciudad} {item.jugador.equipo.nombre}</Card.Text>
                  <Card.Text className="costo">{item.costo}$</Card.Text>
                  <div className="quantity">
                    <Button variant="secondary" onClick={(event) => handleDecrement(event, item)} className="quantity-button" disabled={item.cant_producto === 1}>-</Button>
                    <span className="cant-producto">{item.cant_producto}</span>
                    <Button variant="secondary" onClick={(event) => handleIncrement(event, item)} className="quantity-button">+</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
          </Modal.Footer>
        </Modal>
  );
};

export default Carrito;
