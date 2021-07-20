import React, { useState } from "react";
import "./App.css";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const Products = () => {
  const { category } = useParams();
  const [size, setSize] = useState("");
  const {
    data: products,
    loading,
    error,
  } = useFetch("products?category=" + category);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }
  const handleChange = (e) => {
    setSize(e.target.value);
  };

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;
  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select id="size" onChange={handleChange}>
          <option value={size}>All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section>{filteredProducts.map((p) => renderProduct(p))}</section>
    </>
  );
};

export default Products;
