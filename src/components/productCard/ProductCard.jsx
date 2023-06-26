import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={product.images[3]} style={{ width: "100%", height: "10rem" }} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text style={{ height: "5rem", overflow: "scroll" }}>{product.description}</Card.Text>
        <Card.Text className="text-danger">${product.price}</Card.Text>
        <Button onClick={()=> dispatch(addToCart(product))} variant="primary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};
