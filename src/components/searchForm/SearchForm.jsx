import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./SearchForm.css"

export const SearchForm = ({ handleFilter, handleSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const applyFilters = new Promise((resolve) => {
      const appliedFilters = Array.from(e.target)
        .filter((filter) => filter.checked)
        .map((filter) => filter.id);

      const filteredProducts = handleFilter(appliedFilters);
      resolve(filteredProducts);
    });

    applyFilters.then((result) => {
      if (inputValue) {
        handleSearch(inputValue, result);
      }
    });
  };

  return (
    <div className="search_form">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row className="align-items-center gap-5">
          <Col xs="auto">
            <Form.Check
              id={"smartphones"}
              label={`Smartphones`}
              // onChange={(e) => handleChange(e)}
            />
            <Form.Check
              id={"laptops"}
              label={`Laptops`}
              // onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs="auto">
            <Form.Control
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mb-2"
              id="inlineFormInput"
              placeholder="Iphone XR"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Search Product
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
