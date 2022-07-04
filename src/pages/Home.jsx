import { useContext } from "react";
import Filters from "../components/Filters";
import { CartContext } from "../context/Context";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const { products, cart } = useContext(CartContext);

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {products.map((product) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
