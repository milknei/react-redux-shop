import React from "react";
import { ProductCard } from "../productCard/ProductCard";

export const ProductList = ({ products }) => {
  return (
    <div className="container text-center">
      <div className="d-flex flex-wrap justify-content-around gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
