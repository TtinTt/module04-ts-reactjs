import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  Changedot,
  getStatus,
  hanleGetColor,
  HandleFilterUser,
  CheckLink,
  prependLocalhost,
  getCurrentTimeString,
  getDaysDifference,
} from "../../function/functionData";

import { updateStatusUser } from "../../actions/userAction";
import UserFilter from "../UserFilter";
import userApi from "../../apis/user.api";

import { User, UserLogined, UserState } from "../../types-unEdit/User";
import { State } from "../../types-unEdit/StateReducer";

import eye from "../../imgs/eye.png";
import hidden from "../../imgs/hidden.png";

import "../../css/Cart.css";

function ManageUser() {
  let link = CheckLink();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDescription, setUserDescription] = useState<string>("");
  const [listCheck, setListCheck] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPass, setShowPass] = useState<boolean>(true);
  const [showResetPass, setShowResetPass] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const searchValue = useSelector(
    (state: State) => state.userReducer.searchFilter
  );
  const filter = useSelector((state: State) => state.userReducer.filter);
  const [users, setUsers] = useState<User[]>([]);

  const checkIsChecked = (array: User[], searchObject: User): boolean => {
    return array.some(
      (element) => JSON.stringify(element) === JSON.stringify(searchObject)
    );
  };

  const handleGetChecked = (isChecked: boolean, user: User): void => {
    if (isChecked) {
      setListCheck((prev) => [...prev, user]);
    } else {
      setListCheck((prev) => prev.filter((item) => item.email !== user.email));
    }
  };

  const fetchUsers = async () => {
    await userApi
      .searchUsers({
        name: searchValue,
        page: currentPage,
        limit: 10,
        sortType: filter,
      })
      .then((data) => {
        setUsers(data.records);
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
        } else {
          console.log(error.response?.statusText);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchValue, filter, link]);

  type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleUpdateStatusUser = async (event: Event, user: User) => {
    let value = event.target.value === "1" ? 1 : 0;

    console.log("user", user);
    user.user_id &&
      userApi
        .updateUser(user.user_id, {
          ...user,
          status: event.target.value === "0" ? 0 : 1,
        })
        .then((response) => {
          fetchUsers();
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response?.statusText);
          setLoading(false);
        });

    await setUserShowing({ ...user, status: value });
  };

  const handleUpdatePasswordUser = async (newPassword: string, user: User) => {
    if (errorPassword.length !== 0) {
      return;
    } else {
      console.log("user", user);
      user.user_id &&
        userApi
          .updateUser(user.user_id, {
            ...user,
            resetPassword: newPassword,
          })
          .then((response) => {
            setShowResetPass(false);
            setErrorPassword("");
            setNewPassword("");
          })
          .catch((error) => {
            console.log("Mật khẩu không hợp lệ");
            setErrorPassword("Mật khẩu không hợp lệ");
            console.log(error);
          });
    }
  };

  const validatePassword = (password: string) => {
    let errorMessage = "";

    if (!(password.length >= 6 && password.length <= 200)) {
      errorMessage = "Mật khẩu chỉ cho phép từ 6 đến 200 ký tự.";
    }

    setErrorPassword(errorMessage);
    console.log(errorMessage);
  };

  const handleUpdateStatusMultiUser = async (
    event: Event,
    listUser: User[]
  ) => {
    let value = event.target.value === "1" ? 1 : 0;
    listUser.forEach((user) => {
      user.user_id &&
        userApi
          .updateUser(user.user_id, { ...user, status: value })
          .then((response) => {
            handleClose();
            fetchUsers();
          })
          .catch((error) => {
            console.log(error.response?.statusText);
          });
      setLoading(false);
    });
    setListCheck([]);
  };

  const [userShowing, setUserShowing] = useState<User | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowResetPass(false);
    setErrorPassword("");
    setNewPassword("");
    setShow(false);
  };

  const handleShow = (user: User) => {
    setShow(true);
    setUserShowing(user);
  };

  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(total / usersPerPage);

  const usersCard = currentUsers.map((user: User, index: number) => {
    return (
      <>
        <tr>
          <td>
            <input
              type="checkbox"
              checked={checkIsChecked(listCheck, user)}
              onClick={(e) =>
                handleGetChecked((e.target as HTMLInputElement).checked, user)
              }
            />
          </td>
          <td
            colSpan={2}
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {user.email}
          </td>
          <td
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "center",
            }}
          >
            {user.date}
          </td>{" "}
          <td
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {user.name}
          </td>
          <td
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "center",
            }}
          >
            {user.phone}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => {
                handleUpdateStatusUser(event, user);
              }}
              value={user.status.toString()}
            >
              <option value="1">Đang hoạt động</option>
              <option value="0">Đình chỉ</option>
            </Form.Select>
          </td>
        </tr>
      </>
    );
  });

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // khi 1 trong các biến phụ [currentPage, users, indexOfFirstUser, indexOfLastUser]
  // thay đổi sẽ chạy lại để lấy giá trị tất cả
  useEffect(() => {
    const description = `${indexOfFirstUser + 1} - ${
      indexOfLastUser > total ? total : indexOfLastUser
    } trong ${total}`;
    setUserDescription(description);
  }, [currentPage, users, indexOfFirstUser, indexOfLastUser]);

  // Pagination phân trang

  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        <p id="statusPagination">{userDescription}</p>

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

  const userInfo = (info: User) => {
    // debugger;
    return (
      <div className="text-center">
        {/* <img
          id="user-img"
          className="text-center"
          src={prependLocalhost(info.img)}
        /> */}
        {info.img == "" ? null : (
          <img
            id="user-img"
            className="text-center"
            src={prependLocalhost(info.img) ?? ""}
          />
        )}

        <InputGroup id="user-info" className="mb-3 mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <Form.Control
              // placeholder="Email của bạn"
              disabled
              aria-label="email"
              aria-describedby="basic-addon1"
              type="email"
              value={info.email}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
            <Form.Control
              // placeholder="Tên của bạn"
              aria-label="name"
              aria-describedby="basic-addon1"
              type="text"
              value={info.name}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Ngày sinh</InputGroup.Text>
            <Form.Control
              // placeholder="Ngày sinh"
              aria-label="bday"
              aria-describedby="basic-addon1"
              type="date"
              value={info.bday}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
            <Form.Control
              // placeholder="Ngày sinh"
              aria-label="add"
              aria-describedby="basic-addon1"
              type="text"
              // as="textarea"
              value={info.add}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
            <Form.Control
              // placeholder="Ngày sinh"
              aria-label="phone"
              aria-describedby="basic-addon1"
              type="number"
              // as="textarea"
              value={info.phone}
              disabled
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Trạng thái tài khoản
            </InputGroup.Text>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => {
                handleUpdateStatusUser(event, info);
              }}
              value={info.status.toString()}
            >
              <option value="1">Đang hoạt động</option>
              <option value="0">Đình chỉ</option>
            </Form.Select>
          </InputGroup>
          {!showResetPass ? (
            <div style={{ width: "100%" }}>
              <Button
                variant="light"
                onClick={() => {
                  setShowResetPass(true);
                }}
              >
                Đặt lại mật khẩu
              </Button>
            </div>
          ) : (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Mật khẩu mới</InputGroup.Text>
              <Form.Control
                placeholder={""}
                aria-describedby="basic-addon1"
                type={!showPass ? "password" : "text"}
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  validatePassword(event.target.value);
                }}
              />

              <Button
                variant="light"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                <img
                  src={!showPass ? hidden : eye}
                  style={{ width: "20px" }}
                ></img>
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  handleUpdatePasswordUser(newPassword, info);
                }}
              >
                Đặt lại mật khẩu
              </Button>
              {errorPassword && (
                <p style={{ width: "100%" }}>{errorPassword}</p>
              )}
            </InputGroup>
          )}
        </InputGroup>
        <br></br>
        <br></br>
      </div>
    );
  };

  // console.log("userShowing", userShowing);
  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
  } else {
    return (
      <>
        {" "}
        <UserFilter></UserFilter>
        {total == 0 ? (
          <h6 className="text-center msgCartTop">
            Không có người dùng nào giống như bạn đang tìm kiếm.
          </h6>
        ) : (
          <>
            <div className="text-center">
              <>
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={listCheck.length === currentUsers.length}
                          onClick={(e) =>
                            (e.target as HTMLInputElement).checked
                              ? setListCheck(currentUsers)
                              : setListCheck([])
                          }
                        />
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          width: "70px",

                          borderRight: "none",
                        }}
                      >
                        {" "}
                        {listCheck.length > 0 && (
                          <span>
                            <Form.Select
                              id="multiSetStatus"
                              aria-label="Default select example"
                              onChange={(event) => {
                                handleUpdateStatusMultiUser(event, listCheck);
                              }}
                            >
                              <option>Huỷ</option>
                              <option value="1">Đang hoạt động</option>
                              <option value="0">Đình chỉ</option>
                            </Form.Select>
                          </span>
                        )}
                      </th>
                      <th
                        className="text-left position-relative headTable-Set"
                        style={{
                          padding: "auto",
                          textAlign: "left",
                          borderLeft: "none",
                        }}
                      >
                        Email
                      </th>
                      <th className="text-center">Ngày tạo tài khoản</th>
                      <th
                        className="text-left position-relative headTable-Set"
                        style={{ padding: "auto", textAlign: "left" }}
                      >
                        Tên
                      </th>
                      <th className="text-center">Số điện thoại</th>
                      <th className="text-center">Trạng thái tài khoản</th>
                    </tr>
                  </thead>
                  <tbody>{usersCard}</tbody>
                </Table>
                {PaginationSet()}
              </>

              <>
                {/* modal */}
                <Modal size="lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-center">
                    {userShowing && userInfo(userShowing)}
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

export default ManageUser;
