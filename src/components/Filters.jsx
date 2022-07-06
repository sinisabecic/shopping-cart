import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CartContext } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  //
  const {
    sort,
    byStock,
    byFastDelivery,
    byRating,
    filterByStock,
    sortByPriceAsc,
    sortByPriceDesc,
    filterByFastDelivery,
    filterByRating,
    clearFilters,
    // productDispatch, //? za dr. nacin
  } = useContext(CartContext);

  console.log(sort, byStock, byFastDelivery, byRating);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={sortByPriceAsc}
          //? drugi nacin
          // onChange={() =>
          //   productDispatch({
          //     type: "SORT_BY_PRICE",
          //     payload: "lowToHigh",
          //   })
          // }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={sortByPriceDesc}
          //? drugi nacin
          // onChange={() =>
          //   productDispatch({
          //     type: "SORT_BY_PRICE",
          //     payload: "highToLow",
          //   })
          // }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={filterByStock}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={filterByFastDelivery}
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) => filterByRating(i)}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button variant="light" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
