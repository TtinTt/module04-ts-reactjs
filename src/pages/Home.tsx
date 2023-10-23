import React from "react";
import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import CarouselProduct from "../components/CarouselProduct";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import NavbarFilter from "../components/NavbarFilter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";
import { CheckLink } from "../function/functionData";

const Home: React.FC = () => {
  let checkLink: string = CheckLink();
  return (
    <Container>
      <div>
        {checkLink === "/" ? (
          <CarouselProduct />
        ) : (
          <div id="catalogueTitle">
            <h1>
              {" "}
              <span
                style={{ letterSpacing: "3px", margin: "0", fontSize: "30px" }}
              >
                Bộ sưu tập{" "}
              </span>
              {checkLink.substring(1).replace(/\s/g, "").toLocaleUpperCase()}
            </h1>
          </div>
        )}
      </div>
      <div className="groupShowProducts">
        <div className="navbar2">
          <NavbarFilter />
        </div>
        <ProductList />
      </div>
    </Container>
  );
};

export default Home;
