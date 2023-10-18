import React from "react";
import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import BoxResetPass from "../components/BoxResetPass";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

const ResetPass: React.FC = () => {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <BoxResetPass />
      <FooterBot />
    </Container>
  );
};

export default ResetPass;
