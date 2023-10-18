import React from "react";
import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import BoxChangePass from "../components/BoxChangePass";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

const ChangePass: React.FC = () => {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <BoxChangePass />
      <FooterBot />
    </Container>
  );
};

export default ChangePass;
