import { useEffect, useState, useContext } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../context/Context";
import Rating from "../components/Rating";

const Cart = () => {
  const { cart, removeFromCart, changeCartQty } = useContext(CartContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    //Generisanje cijena spram kolicini artikla tj. kolicini proizvoda u korpi
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>₹ {product.price}</Col>
                <Col md={2}>
                  <Rating rating={product.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) => changeCartQty(product.id, e.target.value)}
                  >
                    {/* Onoliko koliko je na lageru dozvoli i kolicinu za porucivanje */}
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">In cart: ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: {total} &euro;
        </span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
