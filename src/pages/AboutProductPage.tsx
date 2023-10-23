import React from "react";
import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import Container from "react-bootstrap/Container";
import AboutProduct from "../components/AboutProduct";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

const AboutProductPage: React.FC = () => {
  return (
    <Container>
      <AboutProduct />
    </Container>
  );
};

export default AboutProductPage;
