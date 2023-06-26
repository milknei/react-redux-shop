import { useState, useEffect } from "react";
import { SearchForm } from "./components/searchForm/SearchForm";
import { ProductList } from "./components/productsList/ProductsList";
import { Cart } from "./components/cart/Cart";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

const URL = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const handleFilter = (filters) => {
    console.log(URL + (filters.length > 0 ? `/category/${filters[0]}` : ""));
    let requests = [];

    // Condition in case there are no filters
    if (filters.length === 0) {
      requests.push(fetch(URL));
    } else {
      requests = filters.map((filter) => fetch(URL + (filters.length > 0 ? `/category/${filter}` : "")));
    }

    return Promise.all(requests)
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((filteredProducts) => {
        filteredProducts = filteredProducts
          .flat()
          .map((p) => p.products)
          .flat();
        setProducts(filteredProducts);
        return filteredProducts;
      });
  };

  // // Search request to the API
  // const handleSearch = (request) => {
  //   fetch(`https://dummyjson.com/products/search?q=${request}`)
  //     .then((res) => res.json())
  //     .then(res => setProducts(res.products));
  // };

  // Search request without request to an API but with filters
  const handleSearch = (request, filteredProducts) => {
    console.log(filteredProducts);
    const regex = new RegExp(request, "i");
    const searchResult = filteredProducts.filter((product) => regex.test(product.title));
    setProducts(searchResult);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Cart />
        <SearchForm handleFilter={handleFilter} handleSearch={handleSearch} />
        {products ? <ProductList products={products} /> : "Loading..."}
      </div>
    </Provider>
  );
}

export default App;
