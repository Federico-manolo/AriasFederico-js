import React, { useEffect, useState } from 'react';
import {Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import Carrito from '../Components/Carrito';
import Item from './Item';
import Link from 'next/link';
import '../StyleComponents/Navbar.css';
import { isLoggedIn, getCookieUserName, deleteCookieAuth } from "../service_autentificacion/AuthController";
import axios from 'axios';

type CustomNavbarProps = {
  cartItems: Item[];
  removeFromCart: (item: Item) => void;
  incrementQuantity: (item: Item) => void;
  decrementQuantity: (item: Item) => void;
};

function CustomNavbar({ cartItems, removeFromCart, incrementQuantity, decrementQuantity }: CustomNavbarProps) {
  const [enable, setEnable] = useState(false);
  const [isUserAuth, setIsUserAuth] = useState(true);
  const [userName, setUserName] = useState("");

  function showCarrito() {
    setEnable(true);
  }

  function checkUserAuthenticated() {
    if (isLoggedIn()) {
      setIsUserAuth(true);
      setUserName(getCookieUserName());
    } else {
      setIsUserAuth(false);
    }
  }

  const logOutUser = async () => {
    console.log("Inicio")
    axios.post("https://cyber-strikers-coachvach.vercel.app/rest/logout", null,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("auth_token")
        }
      }
    ).then(response => {
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        //Eliminamos la cookie
        deleteCookieAuth();
        //Eliminamos el token del localStorage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_id");
        setIsUserAuth(false);
      }
    });
  }

  useEffect(() => checkUserAuthenticated(), []);

  function MyProfileOptions({ userAuthenticated }: { userAuthenticated: boolean }) {
    if (userAuthenticated) {
      return (
        <>
          <div className='fw-bolder nav-link'>{userName}</div>
          <Link href="/pedidosUsuario" className='nav-link'>Mis Pedidos</Link>
          <Button className='nav-link' onClick={logOutUser}>Cerrar Sesión</Button>
        </>
      );
    } else {
      return (
        <>
          <Link href="/login" className='nav-link'>Ingresar</Link>
          <Link href="/register" className='nav-link'> Registrarse</Link>
        </>
      );
    }
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Nav as={Link} href="/" className="navbar-logo">
        <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="categoria-dropdown-toggle">
              Categorias
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} href="/cartasCategoria/Oro">
                Oro
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/cartasCategoria/Plata">
                Plata
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/cartasCategoria/Bronce">
                Bronce
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Carrito
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          enable={enable}
          handleClose={() => setEnable(false)}
        />
        <Nav>
          <MyProfileOptions userAuthenticated={isUserAuth} />
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link onClick={() => showCarrito()}>
            <img src="/images/cart.png" alt="Cart" className="navbar-cart-icon" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;