import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

import {
  Changedot,
  getStatus,
  hanleGetColor,
  HandleFilterOrder,
  prependLocalhost,
  getCurrentTimeString,
  getDaysDifference,
  CheckLink,
} from "../../function/functionData";

import { updateStatusOrder } from "../../actions/orderAction";
import OrderFilter from "../OrderFilter";
import orderApi from "../../apis/order.api";

import { State } from "../../types-unEdit/StateReducer";
import { Order } from "../../types-unEdit/Order";

function ManageOrder() {
  let link = CheckLink();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDescription, setOrderDescription] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  let searchValue = useSelector(
    (state: State) => state.orderReducer.searchFilter
  );
  let filter = useSelector((state: State) => state.orderReducer.filter);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const checkTotal = (cart: any[]) => {
    let total = 0;
    if (cart !== undefined) {
      cart.forEach((order) => {
        total = total + order.price * order.quantity;
      });
    }
    return total;
  };

  const checkQuantity = (cart: any[]) => {
    let total = 0;
    if (cart !== undefined) {
      cart.forEach((order) => {
        total = total + order.quantity;
      });
    }
    return total;
  };

  const draftOrder = () => {
    if (total === 0) {
      return null;
    } else {
      return orders[0];
    }
  };

  const fetchOrders = async () => {
    // console.log("đang lấy oder của user có email là ", userEmail);
    // setLoading(true); // Cập nhật trạng thái loading ở đây trước khi gọi API
    await orderApi
      .searchOrders({
        name: searchValue,
        page: currentPage,
        limit: ordersPerPage,
        sortType: filter,
      })
      .then((data) => {
        setOrders(data.records);
        setTotal(data.total);
        setLoading(false);
        if (data.total <= 10) {
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
          // navigate("/orders");
        } else {
          console.log(error.response?.statusText);
          setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
        }
      });
  };
  type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchValue, filter, link]);

  const handleUpdateStatusOrder = async (event: Event) => {
    const newStatus = Number(event.target.value);

    if (orderShowing && typeof orderShowing.id === "number") {
      const updatedOrder = { ...orderShowing, status: newStatus };
      await setOrderShowing(updatedOrder);

      let newOrder = { status: newStatus };
      console.log(newOrder);

      orderApi
        .updateOrder(orderShowing.id, newOrder)
        .then((response) => {
          handleClose();
          fetchOrders();
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response?.statusText);
          setLoading(false);
        });
    } else {
      console.error("Order or order id is missing");
    }
  };

  const [orderShowing, setOrderShowing] = useState(draftOrder());

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (order: Order) => {
    setShow(true);
    setOrderShowing(order);
  };

  // Pagination phân trang

  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(total / ordersPerPage);

  const ordersCard = orders.map((order, index) => {
    return (
      <>
        <tr
          onClick={() => {
            handleShow(order);
          }}
        >
          <td
            style={{
              textAlign: "center",
            }}
          >
            {order.id}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            {order.email}
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            {order.date}
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            {[checkQuantity(order.cart)]}
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            {Changedot(checkTotal(order.cart))}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            {getStatus(order.status)}
          </td>
        </tr>
      </>
    );
  });

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // khi 1 trong các biến phụ [currentPage, orders, indexOfFirstOrder, indexOfLastOrder]
  // thay đổi sẽ chạy lại để lấy giá trị tất cả
  useEffect(() => {
    const description = `${indexOfFirstOrder + 1} - ${
      indexOfLastOrder > total ? total : indexOfLastOrder
    } trong ${total} `;
    setOrderDescription(description);
  }, [currentPage, orders, indexOfFirstOrder, indexOfLastOrder]);

  // Pagination phân trang

  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        <p id="statusPagination">{orderDescription}</p>

        {totalPages && (
          <Pagination id="pagination">
            <Pagination.First
              onClick={() => changePage(1)}
              disabled={currentPage === 1}
            />

            <Pagination.Prev
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => changePage(number)}
                >
                  {number}
                </Pagination.Item>
              )
            )}

            <Pagination.Next
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />

            <Pagination.Last
              onClick={() => changePage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    );
  };
  const orderInfo = (order: Order) => {
    // debugger;
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
            {order.cart.map((order, index) => {
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
                      src={prependLocalhost(order.img[0]) ?? ""}
                    ></img>
                  </td>
                  <td
                    className="leftText"
                    // style={{ textAlign: "left" }}
                  >
                    {order.name}
                  </td>
                  <td>{Changedot(order.price)}</td>
                  <td className="rightText">
                    <Form.Control
                      disabled
                      type="number"
                      value={order.quantity}
                    />
                  </td>
                  <td className="rightText">
                    {Changedot(order.price * order.quantity)}
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
                <strong>{Changedot(checkTotal(order.cart))}</strong>
              </td>
            </tr>
          </tfoot>
        </Table>
      </>
    );
  };

  // console.log("orderShowing", orderShowing);
  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
  } else {
    return (
      <>
        {" "}
        <OrderFilter></OrderFilter>
        {total == 0 ? (
          <h6 className="text-center msgCartTop">
            Không có đơn hàng nào giống như bạn đang tìm kiếm.
          </h6>
        ) : (
          <>
            <div className="text-center">
              <>
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th
                        className="text-left position-relative"
                        style={{ padding: "auto" }}
                      >
                        Khách hàng
                      </th>
                      <th className="text-center">Thời gian</th>
                      <th className="text-center">Số lượng sản phẩm</th>
                      <th className="text-center">Giá đơn hàng</th>
                      <th className="text-center">Trạng thái đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>{ordersCard}</tbody>
                </Table>
                {PaginationSet()}
              </>

              <>
                {/* modal */}
                <Modal size="lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {orderShowing && orderInfo(orderShowing)}
                    {orderShowing && (
                      <div>
                        <br></br>
                        <h6>
                          <strong>Thông tin giao hàng</strong>
                        </h6>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">
                            Người nhận
                          </InputGroup.Text>
                          <Form.Control
                            disabled
                            value={orderShowing.address.name}
                          />
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
                          <Form.Control
                            disabled
                            value={orderShowing.address.address}
                          />
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

                        <>
                          <br></br>
                          <p>
                            <strong>Cập nhật trạng thái đơn hàng</strong>
                          </p>
                          <Form.Select
                            disabled={
                              !(
                                Number(getDaysDifference(orderShowing.date)) > 4
                              )
                                ? true
                                : false
                            }
                            aria-label="Default select example"
                            onChange={(event: Event) => {
                              handleUpdateStatusOrder(event);
                            }}
                            value={orderShowing.status}
                          >
                            <option value="0">
                              Đang xử lý thông tin đơn hàng
                            </option>
                            <option value="1">
                              Đơn hàng đang được chuẩn bị
                            </option>
                            <option value="2">
                              Đơn hàng đang được giao tới
                            </option>
                            <option value="3">
                              Đơn hàng đã được giao thành công
                            </option>
                            <option value="4">
                              Đơn hàng giao không thành công và đang chuyển hoàn
                            </option>
                            <option value="5">
                              Đơn hàng đã được chuyển hoàn
                            </option>
                            <option value="-1">
                              Đơn hàng đã bị huỷ bởi khách hàng
                            </option>
                            <option value="-2">Từ chối đơn hàng</option>
                          </Form.Select>
                        </>
                        {Number(getDaysDifference(orderShowing.date)) < 4 && (
                          <>
                            <br></br>
                            <p
                              className="text-center"
                              style={{ color: "#dc3545" }}
                            >
                              Đơn hàng đang trong thời gian có thể huỷ bởi khách
                              hàng và không thể cập nhật trạng thái.
                            </p>
                          </>
                        )}
                        <br></br>
                      </div>
                    )}
                  </Modal.Body>
                </Modal>
              </>
            </div>
          </>
        )}
      </>
    );
  }
}

export default ManageOrder;
