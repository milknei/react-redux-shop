import React, { useState } from "react";
import { CartButton } from "../cartButton/CartButton";
import { CompleteOrderButton } from "../completeOrderButton/CompleteOrderButton";
import Toast from "react-bootstrap/Toast";
import ListGroup from "react-bootstrap/ListGroup";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  console.log(cartItems);

  const toggleShowCart = () => setShowCart(!showCart);

  const getTotalPrice = (cart) => {
    if (cart.length > 0) {
      return cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    } else return 0;
  };

  const getNumOfCartProducts = (cart) => {
    return cart.reduce((acc, cur) => acc + cur.quantity, 0);
  };

  return (
    <div className="position-fixed bottom-0 end-0 z-3 mb-3 me-3">
      <CartButton
        toggleShowCart={toggleShowCart}
        showCart={showCart}
        getNumOfCartProducts={getNumOfCartProducts(cartItems)}
      />
      <Toast show={showCart} onClose={toggleShowCart} className="max_width">
        <Toast.Header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="black"
            className="bi bi-basket me-3"
            viewBox="0 0 16 16"
          >
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
          </svg>
          <strong className="me-auto">Total price: ${getTotalPrice(cartItems)}</strong>
        </Toast.Header>
        <Toast.Body className="max_width">
          <ListGroup className="mb-2">
            {cartItems.map((product) => (
              <ListGroup.Item className="max_width" key={product.id}>
                <div className="d-flex justify-content-between align-items-center gap-4">
                  <span className="text-success">${product.price * product.quantity}</span>
                  <p className="m-0 d-flex justify-content-center align-items-center mx-4">
                    <span className="bg-secondary text-white rounded px-2 me-1">{product.quantity}</span>
                    <span className="fs-6">{product.title}</span>
                  </p>
                  <button className="btn text-danger-emphasis " onClick={() => dispatch(deleteFromCart(product))}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <CompleteOrderButton cart={cartItems} />
        </Toast.Body>
      </Toast>
    </div>
  );
};
