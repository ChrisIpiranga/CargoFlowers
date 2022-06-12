import React, { useState } from "react"
import Autocomplete from "react-google-autocomplete"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faRemove,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faPencil
} from "@fortawesome/free-solid-svg-icons"
import {
  Container,
  Card,
  Collapse,
  Button,
  Row,
  Form,
  Col,
  InputGroup,
} from "react-bootstrap"

function OrderSummary(props) {

  var locale = navigator.language || navigator.userLanguage

  const [showShipping, setShowShipping] = useState(true);
  const [showInvoice, setShowInvoice] = useState(true);

  function subtotal() {
    let sumItem = props.itemsBasket.reduce(function (prev, current) {
      return prev + +current.price
    }, 0)

    return sumItem
  }

  function total() {

    let shipping = 0.0

    if (props.userOptions.Shipping.Date) {
      shipping = props.returnShippingSet().price
    }

    return +(subtotal() + shipping).toFixed(12);
  }

  const basketReady = total() > 0;

  const shippingAddressReady = Object.values(
    props.userOptions.ShippingAddress
  ).every((value) => Boolean(value))

  const InvoiceAddressReady = Object.values(
    props.userOptions.InvoiceAddress
  ).every((value) => Boolean(value))

  const shippingReady = Object.values(
    props.userOptions.Shipping
  ).every((value) => Boolean(value))

  return (
    <div className="sticky-up-down d-none d-lg-flex">
      <Container className="shadow mt-sm-2 my-lg-3 rounded p-3">
        <Row>
          <Col>
            <Card bg="primary" text="dark" className="d-flex">
              <Card.Header className="font-size-15">Order Summary</Card.Header>
              <Card.Body>
                {props.itemsBasket.length ? (
                  props.itemsBasket.map((product, index) => {
                    return (
                      <Row key={index} className="mt-2 mt-lg-1 g-0">
                        <Col lg={8} className="font-size-14 text-mute">
                          <strong>{product.name}</strong>
                          <span className="d-block mt-n1 font-size-12">
                            {product.description}
                          </span>
                        </Col>
                        <Col lg={1} className="align-self-center">
                          <FontAwesomeIcon
                            icon={faRemove}
                            onClick={() => props.removeHandler(product.id)}
                            className="d-inline font-size-14 text-danger cursor-pointer"
                          />
                        </Col>
                        <Col
                          lg={3}
                          className="font-size-14 text-end fw-bold align-self-center"
                        >
                          € {product.price}
                        </Col>
                      </Row>
                    )
                  })
                ) : (
                  <span className="font-size-12 text-muted">Basket Empty</span>
                )}
                <hr />
                <Row className="mt-2 mt-lg-1 g-0">
                  <Col lg={4} className="font-size-14 text-primary">
                    Delivery Option:
                  </Col>
                  <Col lg={5} className="font-size-14">
                    {props.userOptions.Shipping.Date
                      ? `${props.returnShippingSet().name} (${
                          props.returnShippingSet().type
                        })`
                      : "---"}
                  </Col>
                  <Col
                    lg={3}
                    className="font-size-14 text-end text-danger fw-bold"
                  >
                    {props.userOptions.Shipping.Date
                      ? `€ ${props.returnShippingSet().price}`
                      : "---"}
                  </Col>
                </Row>
                <Row className="mt-2 mt-lg-1 g-0">
                  <Col lg={4} className="font-size-14 text-primary">
                    Delivery Date:
                  </Col>
                  <Col lg={8} className="font-size-14">
                    {props.userOptions.Shipping.Date
                      ? moment(props.userOptions.Date).format("DD/MM/YYYY")
                      : "---"}
                  </Col>
                </Row>
                <hr />
                <Row className="mt-2 mt-lg-1 g-0">
                  <Col lg={7} className="font-size-16 text-primary fw-bold">
                    Total:
                  </Col>
                  <Col
                    lg={5}
                    className="font-size-16 text-end text-danger fw-bold"
                  >
                    € {total()}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-1">
          <Col>
            <Form.Check
              className="font-size-14 mt-2 text-muted text-nowrap"
              defaultValue={props.userOptions.Order.MessageCard}
              checked={props.userOptions.Order.MessageCard}
              inline
              type="switch"
              aria-controls="message-wrapper"
              aria-expanded={props.userOptions.Order.MessageCard}
              id="include-card"
              label={
                <div className="w-100">
                  Add <span className="text-primary">Message Card</span>?
                </div>
              }
              onChange={(e) =>
                props.filterHandler("Order", "Card", e.target.checked)
              }
            />
          </Col>
          <Col className="align-self-center text-end">
            <FontAwesomeIcon
              icon={faPencil}
              className="d-inline font-size-12 text-danger me-3"
            />
          </Col>
        </Row>
        <Collapse in={props.userOptions.Order.Card}>
          <Row className="mb-3">
            <Col>
              <Card bg="primary" text="dark" className="d-flex">
                <Card.Body id="message-wrapper" className="pb-0">
                  <Row className="g-0">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      Message:
                    </Col>
                    <Col lg={8} className="font-size-14">
                      <Form.Group>
                        <Form.Group controlId="message">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            type="text"
                            placeholder="Message"
                            value={props.userOptions.Order.Message}
                            className="form-control-sm w-100"
                            onChange={(e) =>
                              props.filterHandler(
                                "Order",
                                "Message",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      Sender:
                    </Col>
                    <Col lg={8} className="font-size-14">
                      <Form.Group controlId="sender">
                        <Form.Control
                          type="text"
                          placeholder={
                            props.userOptions.Order.Anonymously
                              ? "No sender"
                              : "Sender"
                          }
                          disabled={props.userOptions.Order.Anonymously}
                          value={props.userOptions.Order.Sender}
                          className="form-control-sm w-100"
                          onChange={(e) =>
                            props.filterHandler(
                              "Order",
                              "Sender",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-0">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    ></Col>
                    <Col lg={8} className="font-size-14">
                      <Form.Check
                        className="font-size-12 text-secondary mt-2"
                        defaultValue={props.userOptions.Order.Anonymously}
                        checked={props.userOptions.Order.Anonymously}
                        type="switch"
                        aria-controls="message-wrapper"
                        aria-expanded={props.userOptions.Order.Anonymously}
                        id="send-anonymously"
                        label="Anonymously?"
                        onChange={(e) =>
                          props.filterHandler(
                            "Order",
                            "Anonymously",
                            e.target.checked
                          )
                        }
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Collapse>
        <Row>
          <Col>
            <Card bg="primary" text="dark" className="d-flex">
              <Card.Header className="font-size-15">
                <Row>
                  <Col>Shipping Details</Col>
                  <Col className="text-end">
                    <FontAwesomeIcon
                      icon={showShipping ? faAngleDoubleUp : faAngleDoubleDown}
                      onClick={() => setShowShipping(!showShipping)}
                      className="d-inline font-size-15 text-danger cursor-pointer"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={showShipping}>
                <Card.Body>
                  <Row className="g-0">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      First / Last Name:
                    </Col>
                    <Col lg={8}>
                      <Row className="g-0">
                        <Col className="pe-2">
                          <Form.Group controlId="name">
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              value={
                                props.userOptions.ShippingAddress.FirstName
                              }
                              className="form-control-sm"
                              onChange={(e) =>
                                props.filterHandler(
                                  "ShippingAddress",
                                  "FirstName",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="name">
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              value={props.userOptions.ShippingAddress.LastName}
                              className="form-control-sm"
                              onChange={(e) =>
                                props.filterHandler(
                                  "ShippingAddress",
                                  "LastName",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
                    <Col lg={4} className="font-size-14 text-primary">
                      Delivery Address:
                    </Col>
                    <Col lg={8} className="font-size-14">
                      {props.userOptions.ShippingAddress.Address ? (
                        props.userOptions.ShippingAddress.Address
                      ) : (
                        <span className="font-size-12 tip">
                          use the{" "}
                          <i className="text-muted">
                            [Delivery Address:
                            <span className="text-danger">*</span>]
                          </i>{" "}
                          to add
                        </span>
                      )}
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      Email:
                    </Col>
                    <Col lg={8}>
                      <Form.Group controlId="name">
                        <Form.Control
                          type="email"
                          placeholder="Email Address"
                          value={props.userOptions.ShippingAddress.Email}
                          className="form-control-sm"
                          onChange={(e) =>
                            props.filterHandler(
                              "ShippingAddress",
                              "Email",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      Phone:
                    </Col>
                    <Col lg={8}>
                      <Form.Group controlId="phone">
                        <Form.Control
                          type="phone"
                          placeholder="Phone"
                          value={props.userOptions.ShippingAddress.Phone}
                          className="form-control-sm"
                          onChange={(e) =>
                            props.filterHandler(
                              "ShippingAddress",
                              "Phone",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card bg="primary" text="dark" className="d-flex">
              <Card.Header className="font-size-15">
                <Row>
                  <Col>Invoice Details</Col>
                  <Col className="text-end">
                    <FontAwesomeIcon
                      icon={showInvoice ? faAngleDoubleUp : faAngleDoubleDown}
                      onClick={() => setShowInvoice(!showInvoice)}
                      className="d-inline font-size-15 text-danger cursor-pointer"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={showInvoice}>
                <Card.Body>
                  <Row className="g-0">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      First / Last Name:
                    </Col>
                    <Col lg={8}>
                      <Row className="g-0">
                        <Col className="pe-2">
                          <Form.Group controlId="name">
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              value={props.userOptions.InvoiceAddress.FirstName}
                              className="form-control-sm"
                              onChange={(e) =>
                                props.filterHandler(
                                  "InvoiceAddress",
                                  "FirstName",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="name">
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              value={props.userOptions.InvoiceAddress.LastName}
                              className="form-control-sm"
                              onChange={(e) =>
                                props.filterHandler(
                                  "InvoiceAddress",
                                  "LastName",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
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
                            maxLength={64}
                            required={true}
                            options={{
                              types: ["address"],
                              componentRestrictions: { country: "de" },
                            }}
                            className="form-control form-control-sm"
                            onPlaceSelected={(place) => {
                              props.filterHandler(
                                "InvoiceAddress",
                                "Address",
                                place.formatted_address
                              )
                            }}
                            onChange={(e) =>
                              props.filterHandler(
                                "InvoiceAddress",
                                "Address",
                                e.target.value
                              )
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      Email:
                    </Col>
                    <Col lg={8}>
                      <Form.Group controlId="name">
                        <Form.Control
                          type="email"
                          placeholder="Email Address"
                          value={props.userOptions.InvoiceAddress.Email}
                          className="form-control-sm"
                          onChange={(e) =>
                            props.filterHandler(
                              "InvoiceAddress",
                              "Email",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-0 mt-2">
                    <Col
                      lg={4}
                      className="font-size-14 text-primary align-self-center"
                    >
                      Phone:
                    </Col>
                    <Col lg={8}>
                      <Form.Group controlId="phone">
                        <Form.Control
                          type="phone"
                          placeholder="Phone"
                          value={props.userOptions.InvoiceAddress.Phone}
                          className="form-control-sm"
                          onChange={(e) =>
                            props.filterHandler(
                              "InvoiceAddress",
                              "Phone",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant="primary"
              disabled={
                !(
                  basketReady &&
                  shippingAddressReady &&
                  InvoiceAddressReady &&
                  shippingReady
                )
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
