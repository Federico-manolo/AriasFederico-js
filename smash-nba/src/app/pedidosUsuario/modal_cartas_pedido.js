'use client';

import { Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function modalPedidoCartas({cartas_pedido, enable, handleClose}){
    return (
        <Modal show={enable} onHide={handleClose} centered fullscreen="sm-down">
            <Modal.Header closeButton>
                <div>
                    <Modal.Title>Nro. Pedido: {cartas_pedido.id}</Modal.Title>
                    <p className='m-0'>{cartas_pedido.fecha}</p>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className='fw-bold'>Carta</Col>
                    <Col className='fw-bold text-end'>Nombre del Jugador</Col>
                    <Col className='fw-bold text-center'>Cantidad</Col>
                    <Col className='fw-bold text-end'>Precio Unitario</Col>
                </Row>
                {(cartas_pedido.cartas)?(
                    cartas_pedido.cartas.map( carta =>
                        <Row key={carta.id}>
                            <Col>{carta.id}</Col>
                            <Col className='text-center'>{carta.jugador.apellido}, {carta.jugador.nombre}</Col>
                            <Col className='text-center'>{carta.cantidad}</Col>
                            <Col className='text-end'>{carta.costo}</Col>
                        </Row>
                    )
                ):(
                    <Row>Vacio</Row>
                )}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Col xs={12} sm="auto">Precio Total:</Col>
                <Col xs={12} sm="auto">${cartas_pedido.monto_total}</Col>
            </Modal.Footer>
            
        </Modal>
    );
}