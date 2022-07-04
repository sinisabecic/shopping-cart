import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { CartContext } from "../context/Context";
import Rating from "../components/Rating";

const SingleProduct = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  /* moze i cart.find((p) => p.id === product.id) */
  let addedProduct = cart.some((p) => p.id === product.id);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>{product.price} &euro;</span>
            {product.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>

          {addedProduct ? (
            <Button variant="danger" onClick={() => removeFromCart(product.id)}>
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
            >
              {!product.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
