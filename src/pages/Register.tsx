import React from "react";
import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import BoxRegister from "../components/BoxRegister";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

const Register: React.FC = () => {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <BoxRegister />
      <FooterBot />
    </Container>
  );
};

export default Register;
