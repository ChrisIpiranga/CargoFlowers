import "../../css/header.css"

import Container from "react-bootstrap/Container"
import Navigation from "../Navigation"

function Header() {
  return (
    <Container fluid={true} className="p-0">
      <Navigation />
    </Container>
  )
}

export default Header
