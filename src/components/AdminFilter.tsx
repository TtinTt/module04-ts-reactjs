import React, { useEffect, useState, ChangeEvent } from "react";
import "../css/NavbarFilter.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { logoutAdmin } from "../actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { Changedot, CheckLink } from "../function/functionData";
import {
  sortProducts,
  priceFrom,
  inputSearchBox,
} from "../actions/productAction";
import { inputSearchAdmin } from "../actions/adminAction";
import { filterAdmin } from "../actions/adminAction";
import { FormLabel } from "react-bootstrap";

import { State } from "../types-unEdit/StateReducer";
import { OrderState } from "../types-unEdit/Order";

function AdminFilter() {
  const changeFilter = (value: number) => {
    setSort(value);
    dispatch(filterAdmin(value));
  };

  const valueSearch: string = useSelector<State, OrderState["searchFilter"]>(
    (state) => state.orderReducer.searchFilter
  );

  const [sort, setSort] = useState<number>(2); // Giá trị mặc định

  const [searchValue, setSearchValue] = useState<string>(""); // Giá trị mặc định

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inputSearchAdmin(""));
  }, [dispatch]);

  const setFilterOrder = (): string => {
    switch (sort) {
      case 2:
        return "Tất cả";
      case 1:
        return "Đang hoạt động";
      case 0:
        return "Đình chỉ";
      default:
        return "";
    }
  };

  // lấy dữ liệu search
  const handleGetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputSearchAdmin(event.target.value));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-filter">
      <Container fluid id="navbarScrollContainer">
        {/* <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div id="groupSortMaxPrice">
            <h5 className="text-center ">Danh sách quản trị viên</h5>
          </div>
          <div id="groupSearchProduct">
            {" "}
            <Nav className="d-flex position-relative" style={{ top: "0px" }}>
              <Form.Label htmlFor="inputDropdown">Hiển thị</Form.Label>
              <Form.Control
                id="inputDropdown"
                placeholder="Hiển thị"
                disabled
                aria-label="Text input with dropdown button"
                className="sortStatus2"
              />
              <DropdownButton
                variant="outline-secondary"
                title={setFilterOrder()}
                id="input-group-dropdown-3"
                align="end"
              >
                <Dropdown.Item onClick={() => changeFilter(2)} href="#">
                  Tất cả
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeFilter(1)} href="#">
                  Đang hoạt động
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeFilter(0)} href="#">
                  Đình chỉ
                </Dropdown.Item>
              </DropdownButton>
            </Nav>
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip-left`}>
                  Tìm kiếm theo <strong>email</strong>
                  {/* hoặc{" "}
                  <strong>trạng thái tài khoản</strong> */}
                </Tooltip>
              }
            >
              <Navbar.Brand className="d-flex">
                <Form.Control
                  as="input"
                  name="search"
                  type="search"
                  placeholder="Tìm kiếm quản trị viên"
                  aria-label="Search"
                  onChange={handleGetInput}
                />
              </Navbar.Brand>
            </OverlayTrigger>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminFilter;
