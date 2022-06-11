import React from "react"
import Autocomplete from "react-google-autocomplete"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faRemove} from "@fortawesome/free-solid-svg-icons"
import {
  Container,
  Card,
  Button,
  Row,
  Form,
  Col,
  InputGroup,
} from "react-bootstrap"

function OrderSummary(props) {

  function subtotal() {
    let sumItem = props.itemsBasket.reduce(function (prev, current) {
      return prev + +current.price
    }, 0)

    return sumItem
  }

  function total() {

    let shipping = 0.0

    if (props.userOptions.Date) {
      shipping = props.returnShippingSet().price;
    }

    return +(subtotal() + shipping).toFixed(12);
  }

  return (
    <div className="sticky-up-down d-none d-lg-flex">
      <Container className="shadow mt-sm-2 mt-lg-3 rounded p-3">
        <Row>
          <Col>
            <Card bg="primary" text="dark" className="d-flex">
              <Card.Header className="font-size-15">
                Shipping Details
              </Card.Header>
              <Card.Body>
                <Row className="g-0">
                  <Col lg={4} className="font-size-14 text-primary">
                    Delivery Address:
                  </Col>
                  <Col lg={8} className="font-size-14">
                    {props.userOptions.ShippingAddress
                      ? props.userOptions.ShippingAddress
                      : "---"}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card bg="primary" text="dark" className="d-flex">
              <Card.Header className="font-size-15">
                Invoice Details
              </Card.Header>
              <Card.Body>
                <Row className="g-0">
                  <Col
                    lg={4}
                    className="font-size-14 text-primary align-self-center"
                  >
                    Invoice Address:
                  </Col>
                  <Col lg={8} className="font-size-14">
                    <Form.Group>
                      <InputGroup hasValidation>
                        <Autocomplete
                          apiKey="AIzaSyAkKn1ZaV0TKZ-DEnTwS_IEhMszuwPhY5A"
                          required={true}
                          options={{
                            types: ["address"],
                            componentRestrictions: { country: "de" },
                          }}
                          className="form-control form-control-lg"
                          onPlaceSelected={(place) => {
                            props.filterHandler(
                              "InvoiceAddress",
                              place.formatted_address
                            )
                          }}
                          onChange={(e) =>
                            props.filterHandler(
                              "InvoiceAddress",
                              e.target.value
                            )
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card bg="primary" text="dark" className="d-flex">
              <Card.Header className="font-size-15">Order Summary</Card.Header>
              <Card.Body>
                {props.itemsBasket.map((product, index) => {
                  return (
                    <Row key={index} className="mt-2 mt-lg-1 g-0">
                      <Col lg={4} className="font-size-14 text-primary">
                        Product:
                      </Col>
                      <Col lg={4} className="font-size-14">
                        {product.name}
                      </Col>
                      <Col lg={1}>
                        <button
                          className="remove"
                          onClick={() => props.removeHandler(product.id)}
                        >
                          <FontAwesomeIcon
                            icon={faRemove}
                            className="d-inline font-size-15 text-danger"
                          />
                        </button>
                      </Col>
                      <Col
                        lg={3}
                        className="font-size-14 text-end text-danger fw-bold"
                      >
                        € {product.price}
                      </Col>
                    </Row>
                  )
                })}
                <hr />
                <Row className="mt-2 mt-lg-1 g-0">
                  <Col lg={4} className="font-size-14 text-primary">
                    Delivery Options:
                  </Col>
                  <Col lg={5} className="font-size-14">
                    {props.userOptions.Date
                      ? `${props.returnShippingSet().name} (${
                          props.returnShippingSet().type
                        })`
                      : "---"}
                  </Col>
                  <Col
                    lg={3}
                    className="font-size-14 text-end text-danger fw-bold"
                  >
                    €{" "}
                    {props.userOptions.Date
                      ? `${props.returnShippingSet().price}`
                      : "---"}
                  </Col>
                </Row>
                <Row className="mt-2 mt-lg-1 g-0">
                  <Col lg={4} className="font-size-14 text-primary">
                    Delivery Date:
                  </Col>
                  <Col lg={8} className="font-size-14">
                    {props.userOptions.Date
                      ? moment(props.userOptions.Date).format("DD/MM/YYYY")
                      : "---"}
                  </Col>
                </Row>
                <hr />
                <Row className="mt-2 mt-lg-1 g-0">
                  <Col lg={7} className="font-size-14 text-primary">
                    Total:
                  </Col>
                  <Col
                    lg={5}
                    className="font-size-14 text-end text-danger fw-bold"
                  >
                    € {total()}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant="primary"
              disabled={
                props.userOptions.ShippingAddress === "" ||
                props.userOptions.InvoiceAddress === "" ||
                props.userOptions.Date === "" ||
                subtotal() === 0
              }
              onClick={(e) => props.handleSubmit(e)}
              className="d-block ms-auto w-100 mt-2"
            >
              Buy Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default OrderSummary
