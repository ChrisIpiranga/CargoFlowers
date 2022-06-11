import "../../css/header.css"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee, faInfoCircle, faShippingFast, faPhone } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const menu = [
  {
    name: "About Us",
    link: "/about",
    icon: faInfoCircle,
    active: false,
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
    icon: faCoffee,
    active: false,
  },
  {
    name: "Shipping Info",
    link: "/shipping-info",
    icon: faShippingFast,
    active: false,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: faPhone,
    active: false,
  },
]

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <img src={require("../../assets/logo.png")} alt="Cargo Flowers" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {Object.entries(menu).map(([key, item], i) => (
              <Link
                to={item.link}
                data-rr-ui-event-key={item.link}
                className="text-lg-center mt-lg-1 nav-link"
                key={item.name}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="d-inline d-lg-block me-2 me-lg-auto ms-lg-auto"
                />
                <div className="small d-inline d-lg=block">{item.name}</div>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
