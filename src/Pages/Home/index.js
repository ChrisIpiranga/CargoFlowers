import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Filters from "../../components/Filters"
import ExpressDelivery from "../../db/ExpressDelivery"
import OrderSummary from "../../components/OrderSummary"
import ProductsCatalog from "../../components/ProductsCatalog"
import { Row, Col } from "react-bootstrap"

function Home() {

  const [itemsBasket, setItemsBasket] = useState([])
  function removeHandler(productId) {
    let itemsFilter = itemsBasket.filter((product) => {
      return product.id !== productId
    })

    setItemsBasket(itemsFilter);
    localStorage.setItem("@cargoFlowerBasket", JSON.stringify(itemsFilter))
  }
  useEffect(() => {
    const basketList = localStorage.getItem("@cargoFlowerBasket")
    setItemsBasket(JSON.parse(basketList) || [])
  }, [])

  const [userOptions, setUserOptions] = useState({
    Product: 0,
    Occasion: 0,
    Flower: 0,
    ShippingAddress: "",
    InvoiceAddress: "",
    Date: "",
    Age: 0,
    Set: true,
    Color: "",
    Card: true,
    Unnamed: false,
  })
  useEffect(() => {
    //console.log(userOptions.DateOption)
  }, [userOptions])

  function filterHandler(key, value) {
    setUserOptions((prevState) => ({ ...prevState, [key]: value }))
  }

  function returnShippingSet() {
    let shippingCurrent = ExpressDelivery.filter(
      (shipping) => shipping.date === userOptions.Date
    )

    if (!shippingCurrent.length) {
      shippingCurrent = ExpressDelivery.filter(
        (shipping) => shipping.type === "Standard"
      )
    }

    return shippingCurrent[0]
  }

  return (
    <Container fluid className="p-0 sticky-mark">
      <Filters
        ExpressDelivery={ExpressDelivery}
        userOptions={userOptions}
        filterHandler={filterHandler}
      />
      <Container>
        <Row>
          <Col lg={8} className="p-sm-0 pe-lg-4">
            <ProductsCatalog
              userOptions={userOptions}
              setItemsBasket={setItemsBasket}
            />
          </Col>
          <Col lg={4} className="px-0">
            <OrderSummary
              userOptions={userOptions}
              returnShippingSet={returnShippingSet}
              ExpressDelivery={ExpressDelivery}
              filterHandler={filterHandler}
              removeHandler={removeHandler}
              itemsBasket={itemsBasket}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Home
