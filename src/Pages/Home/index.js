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
    setItemsBasket(JSON.parse(basketList) || []);
  }, [setItemsBasket])

  const [userOptions, setUserOptions] = useState({
    Filters: {
      Occasion: 0,
      Flower: 0,
      Age: 0,
      Set: true,
      Color: "",
      Gender: ""
    },
    ShippingAddress: {
      Address: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
    },
    InvoiceAddress: {
      Address: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
    },
    Shipping: {
      Date: "",
    },
    Order: {
      Card: false,
      Message: "",
      Sender: "",
      Anonymously: false,
    },
  })
  useEffect(() => {
    console.log(userOptions);
  }, [userOptions])

  function filterHandler(parent, key, value) {

    if (parent === "Order" && key === "Anonymously" && value === true) {
      filterHandler("Order", "Sender", "");
    }
    setUserOptions((prevState) => ({
      ...prevState,
      [parent]: { ...prevState[parent], [key]: value },
    }))
  }

  function returnShippingSet() {
    let shippingCurrent = ExpressDelivery.filter(
      (shipping) => shipping.date === userOptions.Shipping.Date
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
              setItemsBasket={setItemsBasket}
            />
          </Col>
          <Col lg={4} className="px-0">
            <OrderSummary
              userOptions={userOptions}
              returnShippingSet={returnShippingSet}
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
