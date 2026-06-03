import React from 'react'
import { Card, Button } from 'react-bootstrap'


export default function PizzaCard({ pizza, onShowDetail }) {
  return (
   <Card>
      <Card.Img
        variant="top"
        src={pizza.image}
        alt={pizza.pizzaName}
      />

      <Card.Body>
        <Card.Title>{pizza.pizzaName}</Card.Title>

        <Card.Text>{pizza.category}</Card.Text>

        <Button onClick={() => onShowDetail(pizza)}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  )
}
