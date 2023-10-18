import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../actions/adminAction";
import { loginUser } from "../actions/userAction";
import { clearCart } from "../actions/userAction";
import { State } from "../types-unEdit/StateReducer";
import { inputSearchBox } from "../actions/productAction";
import authApi from "../apis/auth.api";
import productApi from "../apis/product.api";
import userApi from "../apis/user.api";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
  useClearLogined,
} from "../function/functionData";
import logo from "../imgs/Logo.png";
import UserButton from "./UserButton";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
// import "../css/NavbarTop.css";
import { Link } from "react-router-dom";

function NavbarTop() {
  const link = CheckLink();
  const clearLogined = useClearLogined();
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );
  const APIKey = localStorage.getItem("X-API-Key");
  const APIKeyAdmin = localStorage.getItem("X-API-Key-Admin");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTagsProducts = useGetTagsProducts();

  useEffect(() => {
    console.log("check API", APIKey, "check API", APIKeyAdmin);

    if (APIKey === null || APIKey === undefined) {
      dispatch(loginUser(null));
    }
    if (APIKeyAdmin === null || APIKeyAdmin === undefined) {
      dispatch(loginAdmin(null));
    }

    (APIKeyAdmin || APIKey) &&
      authApi
        .getAuth()
        .then((response) => {
          console.log("response", response);
          if (response.user?.user_id && response.user?.status === 1) {
            dispatch(loginUser(response.user));
            if (
              link === "/login" ||
              link === "/register" ||
              link === "/resetPass"
            ) {
              navigate("/");
            }
          } else {
            clearLogined("user");
            console.log("link is", link);
            if (
              link === "/cart" ||
              link === "/profile" ||
              link === "/changePass" ||
              link === "/order"
            ) {
              navigate("/login");
            }
          }

          if (response.admin?.admin_id) {
            dispatch(loginAdmin(response.admin));
          } else {
            clearLogined("admin");
          }
          console.log("verify:", response);
        })
        .catch((error) => {
          console.log("Lỗi là", error);
          if (error.response.data.error === "Không thể xác thực người dùng.") {
            clearLogined("user");
            if (
              link === "/cart" ||
              link === "/profile" ||
              link === "/changePass" ||
              link === "/order"
            ) {
              navigate("/login");
            }
          } else if (
            error.response.data.error === "Không thể xác thực quản trị viên."
          ) {
            clearLogined("admin");
          } else {
            clearLogined("all");
            if (
              link === "/cart" ||
              link === "/profile" ||
              link === "/changePass" ||
              link === "/order"
            ) {
              navigate("/login");
            }
          }
        });
  }, [link]);

  let cartUserLogined = useSelector(
    (state: State) => state.userReducer.userLogined?.cart
  );

  useEffect(() => {
    console.log("userLogined", userLogined);
    if (userLogined && userLogined.user_id) {
      userApi
        .updateUser(userLogined.user_id, { cart: userLogined.cart })
        .then(() => {})
        .catch((error) => {
          if (error.response?.status === 401) {
            console.log(error.response?.statusText);
          } else {
            console.log(error.response?.statusText);
          }
        });
    } else {
      console.log("userLogined is null or user_id is missing");
    }
  }, [cartUserLogined]);

  const getTag = async () => {
    await productApi
      .getTag({})
      .then((data) => {
        console.log("1-lấy các tag", data.tags);
        setTagsProducts(data.tags);
        console.log("data.tags", data.tags);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
        } else {
          console.log(error.response?.statusText);
        }
      });
  };

  const [tagsProducts, setTagsProducts] = useState<string[]>([]);

  useEffect(() => {
    getTag();
  }, []);

  const carouselItem = tagsProducts.map((tag) => {
    let urlLink = "/" + tag;
    return (
      <NavDropdown.Item href={urlLink} key={tag}>
        {tag.toLocaleUpperCase()}{" "}
      </NavDropdown.Item>
    );
  });

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbar-top"
      style={{ zIndex: "800" }}
    >
      <Link to="/">
        <div className="logo-set-small">
          <img
            id="icon-logo"
            style={{ width: "100px", height: "60px", marginLeft: "10px" }}
            src={logo}
            alt="cozy"
          />
        </div>
      </Link>

      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <Nav.Link href="/aboutUs">Về chúng tôi</Nav.Link>
            <Nav.Link href="/aboutProduct">Sản phẩm</Nav.Link>
            <Nav.Link href="/contactUs">Liên hệ</Nav.Link>

            <NavDropdown title="Bộ sưu tập" id="navbarScrollingDropdown">
              {carouselItem}
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Navbar.Brand className="d-flex">
            <UserButton link={link} />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
