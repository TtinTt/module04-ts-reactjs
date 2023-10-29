import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, changeQuantity } from "../actions/cartAction";
import {
  Changedot,
  getCurrentTimeString,
  prependLocalhost,
} from "../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import orderApi from "../apis/order.api";
import Modal from "react-bootstrap/Modal";

import { UserLogined } from "../types-unEdit/User";
import { State } from "../types-unEdit/StateReducer";
import { CartItem } from "../types-unEdit/Product";
import "../css/Cart.css";

import { clearCart } from "../actions/userAction";

interface Address {
  name: string;
  address: string;
  phoneNumber: string;
  note: string;
}

function CartList() {
  const userLogined = useSelector<State, UserLogined | null>(
    (state) => state.userReducer.userLogined
  );
  const navigate = useNavigate();

  if (userLogined == null) {
    navigate("/login");
  }
  const cart: CartItem[] = userLogined?.cart || [];
  const dispatch = useDispatch();

  let total = 0;
  cart.forEach((product) => {
    total = total + product.price * product.quantity;
  });
  const [isShowConfirmClearCart, setIsShowConfirmClearCart] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const quantity = Number(event.target.value);
    if (quantity > 0) {
      dispatch(changeQuantity(id, quantity));
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setIsShowConfirmClearCart(false);
  };

  const ConfirmClearCart = () => {
    return (
      <>
        <Button
          style={{ width: "180px" }}
          variant="light"
          onClick={() => {
            setIsShowConfirmClearCart(false);
          }}
        >
          Huỷ
        </Button>
        <Button
          style={{ width: "180px", marginRight: "5px" }}
          variant="secondary"
          onClick={handleClearCart}
        >
          Xác nhận xoá
        </Button>
      </>
    );
  };

  const [isValidateError, setIsValidateError] = useState(false);
  const [errorValidateMsg, setErrorValidateMsg] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsValidateError(false);
    setErrorValidateMsg("");
    setIsShowError(false);
  };
  const handleShow = () => setShow(true);

  const [address, setAddress] = useState<Address>({
    name: userLogined?.name || "",
    address: userLogined?.add_address || "",
    phoneNumber: userLogined?.phone?.toString() || "",
    note: "",
  });

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    let key = event.target.id.split(" ")[1];
    const newAddress = {
      ...address,
      [key]: event.target.value,
    };
    setAddress(newAddress);
    validateAddress(newAddress);
  };

  const validateAddress = (data: Address) => {
    const { name, address, phoneNumber, note } = data;
    if (name == "" || address == "" || phoneNumber == "") {
      setIsValidateError(true);
      setErrorValidateMsg(
        "Không thể để trống tên, địa chỉ hoặc số điện thoại."
      );
      return false;
    } else if (name && (name.length < 3 || name.length > 80)) {
      setIsValidateError(true);
      setErrorValidateMsg("Tên không hợp lệ.");
      return false;
    } else if (phoneNumber && phoneNumber.length < 10) {
      setIsValidateError(true);
      setErrorValidateMsg("Số điện thoại không hợp lệ.");
      return false;
    } else if (address && address.length < 20) {
      setIsValidateError(true);
      setErrorValidateMsg(
        "Địa chỉ không hợp lệ. Vui lòng điền địa chỉ chi tiết hơn"
      );
      return false;
    } else {
      setIsValidateError(false);
      setErrorValidateMsg("");
      return true;
    }
  };

  const handleCreateOrder = () => {
    if (validateAddress(address)) {
      const order = {
        email: userLogined?.email,
        // id: uuidv4(),
        cart: cart,
        address: address,
        date: getCurrentTimeString(),
        status: "0",
      };
      console.log(order);

      orderApi
        .createOrder(order)
        .then(() => {
          // dispatch(register(response.token));
          handleClearCart();
          handleClose();
          navigate("/order");
        })
        .catch((error) => {
          console.log(error.response?.statusText);
        });

      // dispatch(createOrder(order)); // Gửi đơn hàng tới store
    } else {
      setIsShowError(true);
    }
  };

  return cart.length == 0 ? (
    <h5 className="text-center msgCartTop">
      Giỏ hàng của bạn không có sản phẩm nào.
    </h5>
  ) : (
    <div className="text-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th colSpan={2}>Thông tin sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td className="p-0" style={{ width: "60px", height: "60px" }}>
                  <img
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                    src={prependLocalhost(product.img[0]) ?? ""}
                  ></img>
                </td>
                <td
                  className="leftText"
                  // style={{ textAlign: "left" }}
                >
                  {product.name}
                </td>
                <td>{Changedot(product.price)}</td>
                <td className="rightText">
                  <Form.Control
                    type="number"
                    as="input" // Đảm bảo rằng FormControl này là một input
                    value={product.quantity}
                    onChange={(event) =>
                      handleChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        product.product_id
                      )
                    }
                  />
                </td>
                <td className="rightText">
                  {Changedot(product.price * product.quantity)}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="rightText" colSpan={5}>
              Tổng đơn hàng
            </td>
            <td className="rightText">
              <strong>{Changedot(total)}</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
      <div className="mx-auto p-1">
        {isShowConfirmClearCart == false ? (
          <>
            <Button
              style={{ width: "180px", marginRight: "5px" }}
              variant="light"
              onClick={() => {
                setIsShowConfirmClearCart(true);
              }}
            >
              Xoá giỏ hàng
            </Button>
            <Button
              style={{ width: "180px" }}
              variant="secondary"
              onClick={handleShow}
            >
              Đặt hàng
            </Button>
          </>
        ) : (
          ConfirmClearCart()
        )}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin nhận hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <FloatingLabel
              controlId="floatingInput name"
              label="Tên người nhận *"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control type="text" placeholder="?" value={address.name} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput phoneNumber"
              label="Số điện thoại *"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control
                type="number"
                placeholder="?"
                value={address.phoneNumber}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput address"
              label="Địa chỉ *"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control
                type="text"
                placeholder="?"
                value={address.address}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput note"
              label="Lưu ý giao hàng"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control type="text" placeholder="?" value={address.note} />
            </FloatingLabel>
            <p style={{ color: "#dc3545" }}>
              {" "}
              {isShowError == true && errorValidateMsg}
            </p>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="secondary" onClick={handleCreateOrder}>
            Xác nhận đơn hàng
          </Button>
          <p className="text-center ">
            Bạn có thể huỷ đơn hàng của mình trong vòng 4 giờ sau khi đặt hàng.
            Đơn hàng sẽ giao tới địa chỉ của bạn trong vòng 4-10 ngày làm việc.
            Bạn cần thanh toán <strong>{Changedot(total)}</strong> khi nhận
            hàng.
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CartList;
