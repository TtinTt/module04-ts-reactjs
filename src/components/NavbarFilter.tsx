import React, { useEffect, useState } from "react";
import "../css/NavbarFilter.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useDispatch, useSelector } from "react-redux";

import { Changedot, CheckLink } from "../function/functionData";
import {
  sortProducts,
  priceFrom,
  inputSearchBox,
} from "../actions/productAction";
import productApi from "../apis/product.api";
import { State } from "../types-unEdit/StateReducer";

const NavbarFilter: React.FC = () => {
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );
  const productList = useSelector(
    (state: State) => state.productReducer.products
  );

  const [sort, setSort] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const link = CheckLink();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inputSearchBox(""));
  }, [link]);

  const changeSort = (value: number) => {
    setSort(value);
    dispatch(sortProducts(value));
  };

  const sortValue = (): string => {
    switch (sort) {
      case 1:
        return "Giá giảm dần";
      case 2:
        return "Giá tăng dần";
      default:
        return "Tất cả";
    }
  };

  const getPrice = async () => {
    try {
      const data = await productApi.getPrice({});
      setValue(data.maxPrice);
      setMinPrice(data.minPrice);
      setMaxPrice(data.maxPrice);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        console.log(error.response?.statusText);
      }
    }
  };

  const [value, setValue] = useState<number>(maxPrice);

  useEffect(() => {
    getPrice();
  }, []);

  useEffect(() => {
    console.log(maxPrice);

    dispatch(priceFrom(maxPrice));
  }, [maxPrice]);

  const handleChangePriceFrom = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue: number = parseFloat(event.target.value);
    setValue(newValue);
    console.log("newValue");

    dispatch(priceFrom(newValue));
  };

  const handleGetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    dispatch(inputSearchBox(event.target.value));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-filter">
      <Container fluid id="navbarScrollContainer">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div id="groupSortMaxPrice">
            <Nav className="d-flex">
              <label htmlFor="setMaxPrice" id="setMaxPriceLabel">
                Giá tối đa{" "}
                <span style={{ color: "#dc3545" }}>{Changedot(value)}</span>
              </label>
            </Nav>
            <Nav className="d-flex">
              <Form.Range
                id="setMaxPriceRange"
                min={minPrice}
                max={maxPrice}
                step={(maxPrice - minPrice) * 0.1}
                value={value}
                onChange={handleChangePriceFrom}
              />
            </Nav>
          </div>
          <div id="groupSearchProduct">
            <Nav className="d-flex position-relative" style={{ top: "8px" }}>
              <InputGroup
                className="mb-3"
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
                <Form.Control
                  placeholder="Sắp xếp theo"
                  id="input-group-dropdown-2"
                  disabled
                  aria-label="Text input with dropdown button"
                  className="sortStatus"
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={sortValue()}
                  id="input-group-dropdown-2"
                  align="end"
                >
                  <Dropdown.Item onClick={() => changeSort(0)} href="#">
                    Tất cả
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSort(1)} href="#">
                    Giá giảm dần
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSort(2)} href="#">
                    Giá tăng dần
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Nav>
            <OverlayTrigger
              key="left"
              placement="left"
              overlay={
                <Tooltip id="tooltip-left">
                  Tìm kiếm theo <strong>tên sản phẩm, tag</strong> hoặc{" "}
                  <strong>SKU</strong>
                </Tooltip>
              }
            >
              <Navbar.Brand className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm sản phẩm"
                  aria-label="Search"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleGetInput(event)
                  }
                  onClick={() => setShow(!show)}
                />
              </Navbar.Brand>
            </OverlayTrigger>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarFilter;
