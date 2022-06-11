import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header";
import Footer from "./components/Footer";
import Teaser from "./components/Teaser";

import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import PrivacyPolicy from "./Pages/PrivacyPolicy"
import ShippingInfo from "./Pages/ShippingInfo"
import HttpErroror from "./Pages/HttpError"

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Teaser />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<HttpErroror />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesApp
