import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  InputGroup,
  FloatingLabel,
  Image,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { inputSearchBox } from "../actions/productAction";
import { logoutUser, loginUser, updateInfoUser } from "../actions/userAction";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";
import {
  prependLocalhost,
  isArrayContainingObjects,
} from "../function/functionData";

import { UserLogined, UserState } from "../types-unEdit/User";
import { State } from "../types-unEdit/StateReducer";
import "../css/Profile.css";

const BuyerInfo: React.FC = () => {
  const userLogined = useSelector<State, UserLogined | null>(
    (state) => state.userReducer.userLogined
  );

  const [isCanEdit, setIsCanEdit] = useState<boolean>(true);
  const [info, setInfo] = useState<Partial<UserLogined>>({
    user_id: userLogined?.user_id,
    email: userLogined?.email,
    name: userLogined?.name,
    bday: userLogined?.bday,
    add_address: userLogined?.add_address,
    phone: userLogined?.phone,
    img: userLogined?.img,
  });

  useEffect(() => {
    setInfo({
      ...info,
      user_id: userLogined?.user_id,
      email: userLogined?.email,
      name: userLogined?.name,
      bday: userLogined?.bday,
      add_address: userLogined?.add_address,
      phone: userLogined?.phone,
      img: userLogined?.img,
    });
  }, [userLogined]);

  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [imgScr, setImgScr] = useState<string>(
    prependLocalhost(userLogined?.img || "") || ""
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setImgScr(prependLocalhost(userLogined?.img || "") || "");
  }, [userLogined]);

  const handleChangeinfo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const value =
      target.ariaLabel === "img" && target.files
        ? target.files[0]
        : target.value;
    const newInfo = {
      ...info,
      [target.ariaLabel as string]: value,
    };
    console.log(newInfo);
    setInfo(newInfo);
  };

  const handleSaveInfo = () => {
    const errs = validate(info);
    if (errs.size === 0) {
      const formData = new FormData();

      formData.append("add_address", info.add_address || "");
      formData.append("bday", info.bday || "");
      formData.append("name", info.name || "");
      formData.append("phone", info.phone?.toString() || "");
      if (info.img) {
        formData.append("img", info.img);
      }

      userApi
        .updateUser(userLogined?.user_id!, formData)
        .then(() => {
          authApi
            .getAuth()
            .then((response) => {
              dispatch(loginUser(response.user));
              window.location.reload();
            })
            .catch((error) => {
              dispatch(loginUser(null));
              localStorage.removeItem("X-API-Key");
              window.location.reload();
            });
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
          }
        });
    } else {
      setErrors(errs);
    }
  };

  const validate = (user: Partial<UserLogined>): Map<string, string> => {
    const errs = new Map<string, string>();

    if (user.name && user.name.length > 50) {
      errs.set("name", "Tên chỉ cho phép dưới 50 ký tự.");
    }

    return errs;
  };

  return (
    <>
      <div className="text-center">
        <h4>Thông tin người dùng</h4>
        <div>
          {imgScr == "" ? null : (
            <img id="user-img" className="text-center" src={imgScr} />
          )}
          <InputGroup id="user-info" className="mb-3 mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Email của bạn"
                aria-label="email"
                aria-describedby="basic-addon1"
                type="email"
                value={userLogined?.email}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Tên của bạn"
                aria-label="name"
                aria-describedby="basic-addon1"
                type="text"
                value={userLogined?.name}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ngày sinh</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="bday"
                aria-describedby="basic-addon1"
                type="date"
                value={userLogined?.bday}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="add_address"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={userLogined?.add_address}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="phone"
                aria-describedby="basic-addon1"
                type="number"
                // as="textarea"
                value={userLogined?.phone}
              />
            </InputGroup>

            <div id="groupButton" className="mx-auto">
              <br></br>
              <Button
                style={{ display: "inline-block", marginRight: "10px" }}
                type="submit"
                className="btn btn-light"
                onClick={() => navigate("/changePass")}
              >
                Đổi mật khẩu
              </Button>
              <Button
                style={{ display: "inline-block" }}
                type="submit"
                className="btn btn-dark"
                onClick={handleShow}
              >
                Cập nhật thông tin
              </Button>
            </div>
          </InputGroup>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        handleChangeinfo
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
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
                onChange={handleChangeinfo}
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
                onChange={handleChangeinfo}
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
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="add_address"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={info.add_address}
                onChange={handleChangeinfo}
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
                onChange={handleChangeinfo}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ảnh đại diện</InputGroup.Text>
              <Form.Control
                type="file"
                name="avatar"
                aria-label="img"
                aria-describedby="basic-addon1"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleChangeinfo}
                // multiple
              />
            </InputGroup>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="dark" onClick={handleSaveInfo}>
            {" "}
            Lưu thông tin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuyerInfo;
