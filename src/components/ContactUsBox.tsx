import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inputSearchBox } from "../actions/productAction";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";
// import { v4 as uuidv4 } from "uuid";
import messApi from "../apis/mess.api";
import "../css/Profile.css";
import { UserLogined } from "../types-unEdit/User";
import { State } from "../types-unEdit/StateReducer";
import { Mess } from "../types-unEdit/Mess";
import { saveMess } from "../actions/messAction";
import { getCurrentTimeString } from "../function/functionData";

interface Info extends Omit<Mess, "id"> {}

const ContactUsBox: React.FC = () => {
  const navigate = useNavigate();
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  const draftInfo = (): Info => {
    if (userLogined) {
      return {
        email: userLogined.email,
        name: userLogined.name ?? "",
        phone: userLogined?.phone?.toString() ?? "",
        date: getCurrentTimeString(),
        mess: "",
        status: 1,
      };
    } else {
      return {
        email: "",
        name: "",
        phone: "",
        date: getCurrentTimeString(),
        mess: "",
        status: 1,
      };
    }
  };

  const [info, setInfo] = useState<Info>(draftInfo());
  const dispatch = useDispatch();
  const [showErr, setShowErr] = useState(false);

  const handleChangeinfo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newMess: Info = {
      ...info,
      [event.target.getAttribute("name") || ""]: event.target.value,
    };

    setInfo(newMess);
    validateInfo(newMess);
    console.log(newMess);
  };

  const validateInfo = (newMess: Info): string | null => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!newMess.email || !emailRegex.test(newMess.email)) {
      return "Email không hợp lệ.";
    }
    if (!newMess.phone || newMess.phone.length < 10) {
      return "Số điện thoại không hợp lệ.";
    }
    if (!newMess.mess || newMess.mess.length < 25) {
      return "Lời nhắn của bạn quá ngắn.";
    }

    return null;
  };

  useEffect(() => {
    validateInfo(info);
  }, [info]);

  const handleSaveMess = () => {
    if (validateInfo(info)) {
      setShowErr(true);
    } else {
      setShowErr(false);
      console.log(info);
      messApi
        .createMess(info)
        .then((response) => {
          setShow(true);
        })
        .catch((error) => {
          console.log(error.response?.statusText);
        });

      // dispatch(saveMess(info)); // Gửi tới store
    }
  };

  return (
    <>
      <div className="text-center">
        <div>
          <img
            id="user-img"
            className="text-center"
            src="https://i.pinimg.com/originals/66/05/a3/6605a36ab24d182e3e2ab26e12472498.gif"
          />
          <InputGroup id="user-info" className="mb-3 mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Email <span style={{ color: "red" }}> *</span>
              </InputGroup.Text>
              <Form.Control
                disabled={userLogined ? true : false}
                name="email"
                aria-describedby="basic-addon1"
                type="email"
                value={info.email}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
              <Form.Control
                disabled={userLogined && info.name !== "" ? true : false}
                name="name"
                aria-describedby="basic-addon1"
                type="text"
                value={info.name}
                onChange={handleChangeinfo}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Số điện thoại <span style={{ color: "red" }}> *</span>{" "}
              </InputGroup.Text>
              <Form.Control
                disabled={userLogined && info.phone !== "" ? true : false}
                name="phone"
                aria-describedby="basic-addon1"
                type="number"
                // as="textarea"
                value={info.phone}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Lời nhắn của bạn <span style={{ color: "red" }}> *</span>
              </InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                name="mess"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                as="textarea"
                onChange={handleChangeinfo}
              />
            </InputGroup>
          </InputGroup>
          <p>{showErr && validateInfo(info)}</p>
          <Button variant="secondary" onClick={handleSaveMess}>
            <>Để lại lời nhắn cho chúng tôi</>
          </Button>
        </div>
      </div>

      <Modal
        className="modalCenter"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modalCenter">
          <h5>Lời nhắn đã được gửi đi</h5>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px", textAlign: "center" }}>
          Cảm ơn bạn đã để lại lời nhắn! Chúng tôi sẽ phản hồi trong thời gian
          sớm nhất qua thông tin liên hệ mà bạn đã cung cấp.
        </Modal.Body>
        <Modal.Footer className="modalCenter">
          <Button variant="secondary" onClick={handleClose}>
            Quay về trang chủ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactUsBox;
