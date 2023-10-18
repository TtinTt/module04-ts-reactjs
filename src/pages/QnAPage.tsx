import React from "react";
import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import Container from "react-bootstrap/Container";
import QnA from "../components/QnA";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

const QnAPage: React.FC = () => {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <QnA />
      <FooterBot />
    </Container>
  );
};

export default QnAPage;
