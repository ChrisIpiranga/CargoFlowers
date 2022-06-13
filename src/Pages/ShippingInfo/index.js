import { Container } from "react-bootstrap"
import { Row, Col } from "react-bootstrap"
import Delivery from "../../db/Delivery"
import moment from "moment"
function ShippingInfo() {
  return (
    <Container>
      <h1>Shipping Info</h1>
      {Delivery.map((shipping, index) => {
        return (
          <Row>
            <Col className="rounded-top mb-4">
              {shipping.type} ({shipping.name}):{" "}
              <span className="text-danger">€ {shipping.price}</span>
              <br />
              {shipping.type !== "Standard" && (
                <span className="font-size-14">
                  earliest date: {moment(shipping.date).format("DD/MM/YYYY")}
                </span>
              )}
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default ShippingInfo
