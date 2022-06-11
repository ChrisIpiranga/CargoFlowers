import React, { useState } from "react"
import { Container, Button, Modal, Card, Row, Col } from "react-bootstrap"
import Products from "../../db/Products"

function ProductCatalog(props) {

  const [addShow, setAddShow] = useState(false)
  const handleAddClose = () => setAddShow(false)
  const handleAddShow = () => setAddShow(true)

  const [existsShow, setExistsShow] = useState(false)
  const handleExistsClose = () => setExistsShow(false)
  const handleExistsShow = () => setExistsShow(true)

  function handleClick(productId) {
    let product = Products.filter((product) => product.id === productId)[0]
    const basket = localStorage.getItem("@cargoFlowerBasket")
    let basketList = JSON.parse(basket) || []
    const itemAlreadyExists = basketList.some((item) => item.id === product.id)

    if (itemAlreadyExists) {
      handleExistsShow();
      return;
    } else {
      basketList.push(product);
      localStorage.setItem("@cargoFlowerBasket", JSON.stringify(basketList));
      props.setItemsBasket(basketList);
      handleAddShow();
    }
  }

  return (
    <Container className="p-1 p-sm-0 mt-sm-2 mt-lg-4">

      <Modal
        show={addShow}
        centered
        onHide={handleAddClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The product has been successfully added to the basket.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={existsShow}
        centered
        onHide={handleExistsClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Oooops...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product already in the shopping cart.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleExistsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {props.Products.map((product, index) => {
          return (
            <Col
              key={product.id}
              xs={6}
              md={4}
              lg={4}
              xxl={3}
              className="rounded-top mb-3"
            >
              <Card>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300.png/383838/fff"
                />
                <Card.Body>
                  <Card.Title className="font-size-16">
                    {product.name}
                  </Card.Title>
                  <Card.Text className="font-size-14">
                    {product.description}
                  </Card.Text>
                  <Card.Text className="text-danger font-size-20">
                    € {product.price}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleClick(product.id)}
                  >
                    Add to Basket
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
export default ProductCatalog
