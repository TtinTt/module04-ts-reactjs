import React, { FC } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { logoutUser } from "../actions/userAction";
import { logoutAdmin } from "../actions/adminAction";
import authApi from "../apis/auth.api";
import { TruncateString, TruncateName } from "../function/functionData";
import { State } from "../types-unEdit/StateReducer"; // Import the State interface

interface UserButtonProps {
  link: string;
}

const UserButton: FC<UserButtonProps> = ({ link }) => {
  let key = "key";

  let countCart = 0;
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );
  const adminLogined = useSelector(
    (state: State) => state.adminReducer.adminLogined
  );
  const dispatch = useDispatch();

  // kiểm tra userLogined không phải là null hoặc undefined
  if (userLogined && Array.isArray(userLogined.cart)) {
    userLogined.cart.map((product) => {
      countCart = countCart + product.quantity;
    });
  }
  // console.log(!link.includes("/admin"));

  const handleLogout = () => {
    dispatch(logoutUser());

    // authApi
    //   .logout()
    //   .then((response) => {
    //     dispatch(logoutUser());
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // console.log("LOGOUT");
  };

  const handleLogoutAdmin = () => {
    // localStorage.removeItem("adminToken");
    dispatch(logoutAdmin());
    // console.log("LOGOUT ADMIN");
  };

  if (link === "/login") {
    return (
      <Navbar.Brand className="d-flex">
        <Link to="/register">
          <Button variant="outline-dark">Đăng ký</Button>
        </Link>
      </Navbar.Brand>
    );
  } else if (
    // link === "/register" ||
    // link === "/resetPass" ||
    link !== "/login" &&
    link !== "/admin" &&
    userLogined == null
  ) {
    return (
      <Navbar.Brand className="d-flex">
        <Link to="/login">
          <Button variant="outline-dark">Đăng nhập</Button>
        </Link>
      </Navbar.Brand>
    );
  } else if (
    link !== "/login" &&
    link !== "/register" &&
    userLogined !== null &&
    !link.includes("/admin")
  ) {
    return (
      <div
        style={{
          position: "relative",
          top: "4px",
        }}
      >
        <Link to="/profile">
          <p
            style={{
              position: "relative",
              top: "6px",
              left: "0px",
              display: "inline-block",
            }}
          >
            Xin chào
            <Button
              variant="link"
              style={{
                fontSize: "19px",
                position: "relative",
                top: "-4px",
                left: "-7px",
              }}
            >
              {userLogined.name == "" || !userLogined.name
                ? TruncateString(userLogined.email, 9)
                : TruncateName(userLogined.name, 12) == ""
                ? TruncateString(userLogined.email, 9)
                : TruncateName(userLogined.name, 12)}
            </Button>
          </p>
        </Link>

        <Link to="/cart">
          <Button style={{ marginRight: "2px" }} variant="secondary">
            Giỏ hàng{" "}
            <Badge bg={countCart > 0 ? "danger" : "dark"}>{countCart}</Badge>
          </Button>
        </Link>
        <Link to="/order">
          <Button style={{ marginRight: "2px" }} variant="secondary">
            Đơn hàng
          </Button>
        </Link>
        <Link to="/">
          <Button onClick={handleLogout} variant="outline-secondary">
            Đăng xuất
          </Button>
        </Link>
      </div>
    );
  }

  if (link.includes("/admin") && adminLogined !== null) {
    return (
      <div
        style={{
          position: "relative",
          top: "4px",
        }}
      >
        <OverlayTrigger
          key={key}
          placement={"left"}
          overlay={
            <Tooltip id={`tooltip-left`}>
              <strong>{adminLogined.email}</strong>
            </Tooltip>
          }
        >
          <p
            style={{
              position: "relative",
              top: "6px",
              left: "0px",
              display: "inline-block",
            }}
          >
            Xin chào
            <Button
              variant="link"
              style={{
                fontSize: "19px",
                position: "relative",
                top: "-4px",
                left: "-7px",
              }}
            >
              {TruncateString(adminLogined.email, 9)}
            </Button>
          </p>
        </OverlayTrigger>

        <Link to="/admin">
          <Button onClick={handleLogoutAdmin} variant="outline-secondary">
            Đăng xuất
          </Button>
        </Link>
      </div>
    );
  }

  return null; // Or whatever JSX you need to return
};

export default UserButton;
