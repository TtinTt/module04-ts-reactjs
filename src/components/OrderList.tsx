import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import {
  Changedot,
  getStatus,
  hanleGetColor,
  prependLocalhost,
  getCurrentTimeString,
  getDaysDifference,
} from "../function/functionData";
import orderApi from "../apis/order.api";
import { clearCart } from "../actions/userAction";
import { State } from "../types-unEdit/StateReducer";
import { Order, OrderState } from "../types-unEdit/Order";
import { CartItem } from "../types-unEdit/Product";
import "../css/Cart.css";

const CartList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isShowConfirmCancelOrder, setIsShowConfirmCancelOrder] =
    useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [orderShowing, setOrderShowing] = useState<Order>({
    id: 0,
    email: "",
    cart: [],
    address: { name: "", address: "", phoneNumber: undefined, note: "" },
    date: "",
    status: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = (order: Order) => {
    setShow(true);
    setOrderShowing(order);
    setIsShowConfirmCancelOrder(false);
  };

  const fetchOrders = async (userEmail: string) => {
    setLoading(true);
    try {
      const response = await orderApi.getOrderByUserEmail(userEmail);
      setOrders(response);
    } catch (error: any) {
      console.log(error.response?.statusText);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLogined) {
      fetchOrders(userLogined.email);
    } else {
      navigate("/login");
    }
  }, [userLogined, navigate]);

  const checkTotal = (cart: CartItem[]): number => {
    let total = 0;
    cart.forEach((product) => {
      total = total + product.price * product.quantity;
    });
    return total;
  };

  const handleCancelOrder = async (id: number) => {
    setLoading(true);
    try {
      const newOrder = { status: -1 };
      await orderApi.updateOrder(id, newOrder);
      fetchOrders(userLogined!.email);
      handleClose();
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const orderInfo = (order: Order) => {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th
                colSpan={6}
                style={{
                  backgroundColor: hanleGetColor(order.status),
                }}
              >
                <p>
                  <span className="float-start m-1">
                    {getStatus(order.status)}
                  </span>

                  <span className="float-end m-1">
                    Đặt hàng lúc {order.date}
                  </span>
                  <span></span>
                </p>
              </th>
            </tr>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th colSpan={2}>Thông tin sản phẩm</th>
              <th style={{ width: "180px" }}>Đơn giá</th>
              <th style={{ width: "100px" }}>Số lượng</th>
              <th style={{ width: "180px" }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              (order.cart as CartItem[]).map(
                (product: CartItem, index: number) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td
                        className="p-0"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <img
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                          alt="Ảnh bị gỡ"
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
                          disabled
                          type="number"
                          value={product.quantity}
                        />
                      </td>
                      <td className="rightText">
                        {Changedot(product.price * product.quantity)}
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
          <tfoot>
            <tr>
              <td className="rightText" colSpan={5}>
                Tổng đơn hàng
              </td>
              <td className="rightText">
                <strong>
                  {Changedot(checkTotal(order.cart as CartItem[]))}
                </strong>
              </td>
            </tr>
          </tfoot>
        </Table>
      </>
    );
  };

  const ConfirmCancelOrder = () => {
    return (
      <>
        {" "}
        <Button
          style={{ width: "180px", marginRight: "5px" }}
          variant="danger"
          onClick={() => handleCancelOrder(orderShowing.id)}
        >
          Xác nhận
        </Button>
        <Button
          style={{ width: "180px" }}
          variant="light"
          onClick={() => {
            setIsShowConfirmCancelOrder(false);
          }}
        >
          Huỷ
        </Button>
      </>
    );
  };

  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
  } else {
    return orders.length == 0 ? (
      <h5 className="text-center msgCartTop">Bạn không có đơn hàng nào.</h5>
    ) : (
      <div className="text-center">
        <h3 className="text-center ">Đơn hàng của bạn</h3>
        {orders.length > 0 &&
          orders.map((order, i) => {
            return (
              <div
                onClick={() => {
                  handleShow(order);
                }}
              >
                {orderInfo(order)}
              </div>
            );
          })}

        <>
          {/* modal */}
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Chi tiết đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {orderShowing && orderShowing.cart && orderInfo(orderShowing)}
              <div>
                <br></br>
                <h6>
                  <strong>Thông tin giao hàng</strong>
                </h6>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Người nhận
                  </InputGroup.Text>
                  <Form.Control disabled value={orderShowing.address.name} />
                  <InputGroup.Text id="basic-addon1">
                    Số điện thoại
                  </InputGroup.Text>
                  <Form.Control
                    disabled
                    value={orderShowing.address.phoneNumber}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Địa chỉ nhận hàng
                  </InputGroup.Text>
                  <Form.Control disabled value={orderShowing.address.address} />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Lưu ý giao hàng
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Không có lưu ý giao hàng"
                    disabled
                    value={orderShowing.address.note}
                  />
                </InputGroup>

                {Number(getDaysDifference(orderShowing.date)) > 4 && (
                  <p className="text-center" style={{ color: "#dc3545" }}>
                    Đơn hàng đã qua thời gian để có thể huỷ. Vui lòng{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        textDecorationLine: "underline",
                      }}
                      onClick={() => {
                        navigate("/contactUs");
                      }}
                    >
                      liên hệ với chúng tôi
                    </span>{" "}
                    nếu bạn cần hỗ trợ!
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              {isShowConfirmCancelOrder == false ? (
                <div>
                  <Button
                    style={{ width: "180px", marginRight: "5px" }}
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Đóng
                  </Button>
                  {/* {console.log(orderShowing.status)} */}
                  {!(Number(getDaysDifference(orderShowing.date)) > 4) &&
                    Number(orderShowing.status) >= 0 && (
                      <Button
                        style={{ width: "180px" }}
                        variant="danger"
                        onClick={() => {
                          setIsShowConfirmCancelOrder(true);
                        }}
                      >
                        Huỷ đơn hàng
                      </Button>
                    )}
                </div>
              ) : (
                ConfirmCancelOrder()
              )}
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
};

export default CartList;
