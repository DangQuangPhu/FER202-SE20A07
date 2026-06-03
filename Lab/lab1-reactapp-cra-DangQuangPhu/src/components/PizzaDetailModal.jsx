import React from 'react'
import { Modal, Button } from 'react-bootstrap'


export default function PizzaDetailModal({ show, pizza, onClose }) {
  return (
    <Modal show={show} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{pizza && pizza.pizzaName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {pizza && (
          <>
            <img
              src={pizza.image}
              alt={pizza.pizzaName}
              className="img-fluid"
            />
            <p>{pizza.description}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}