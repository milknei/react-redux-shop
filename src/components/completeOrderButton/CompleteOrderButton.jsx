import React from "react";
import Button from "react-bootstrap/Button";

export const CompleteOrderButton = ({ cart }) => {
  return (
    <div className="d-grid gap-2">
      <Button variant="success" size="md" disabled={cart.length === 0}>
        Checkout
      </Button>
    </div>
  );
};
