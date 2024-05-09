"use client";
import { Button, Card, Row, Col } from "react-bootstrap";

export default function pedidosListados({ pedidosUsuario, showOrderPopup }) {
  return (
    <div className="pedidosUsuario m-auto p-2">
      {pedidosUsuario ? (
        pedidosUsuario.map((pedido) => (
          <Card className="mb-3" key={pedido.id}>
            <Card.Body>
              <Row>
                <Col xs={12} md={6} className="text-center text-md-start">
                  <Card.Title>Nro. Pedido: {pedido.id}</Card.Title>
                  <Card.Text>Fecha Realizado: {pedido.fecha_pedido}</Card.Text>
                </Col>
                <Col xs={12} md={6} className="text-center text-md-end">
                  <Card.Text>Estado del Pedido: {pedido.estado}</Card.Text>
                </Col>
                <Col xs={12} md={6} className="text-center text-md-end">
                  <Card.Text>Fecha de entrega:{pedido.fecha_entrega}</Card.Text>
                </Col>
                <Col xs={12} md={6} className="text-center text-md-end">
                  <Card.Text>Precio Total: ${pedido.monto_total}</Card.Text>
                  <Button as={Col} onClick={() => showOrderPopup(pedido)}>
                    Ver detalles de las cartas asociadas
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No hay pedidos</p>
      )}
    </div>
  );
}
