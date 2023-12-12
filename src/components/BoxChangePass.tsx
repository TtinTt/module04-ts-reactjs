import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Pagination,
  Modal,
} from "react-bootstrap";
import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";
import { State } from "../types-unEdit/StateReducer";
import { loginUser } from "../actions/userAction";

interface ErrorState {
  isShowStatus: boolean;
  status: boolean;
  errorMsg: string;
}

interface UserData {
  email: string | undefined;
  oldpassword: string;
  password: string;
  confirmPassword?: string;
}

const BoxChangePass: React.FC = () => {
  const usersDB = useSelector((state: State) => state.userReducer.users);
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/profile");
  };
  const handleShow = () => setShow(true);

  const [user, setUser] = useState<UserData>({
    email: userLogined?.email,
    oldpassword: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<ErrorState>({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  const handleGetInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedUser = {
      ...user,
      [id]: value,
    };
    setUser(updatedUser);
    await validate(updatedUser);
  };

  const changePassByApi = () => {
    const formData = new FormData();
    formData.append("password", user.password);
    userLogined?.user_id &&
      userApi
        .updateUser(
          userLogined.user_id,
          // { password: user.password }
          formData
        )
        .then(() => {
          authApi
            .getAuth()
            .then((response) => {
              // dispatch(loginUser(response));
              console.log(response);
            })
            .catch((error) => {
              dispatch(loginUser(null));
              localStorage.removeItem("userToken");
              console.log(error.response?.status, error.response?.statusText);
            });
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            console.log(error.response?.statusText);
            navigate("/login");
          } else {
            console.log(error.response?.statusText);
          }
        });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // // Lỗi thì ngưng chạy
    event.preventDefault();
    await validate(user);
    const isError = error.status;

    if (isError) {
      // render lỗi và kết thúc
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      // render không lỗi
      delete user.confirmPassword;
      user.email &&
        authApi
          .login(user.email, user.oldpassword, "customer")
          .then((response) => {
            // dispatch(login(response.token));
            console.log(response);
            window.localStorage.setItem("userToken", response.token);
            changePassByApi();
            setShow(true);
          })
          .catch((error) => {
            console.log(error.response?.statusText);
            let newError = { ...error };
            setError({
              isShowStatus: true,
              status: true,
              errorMsg: "Mật khẩu cũ không chính xác",
            });
          });

      console.log(user);
      // dispatch(changePassUser(user));
    }
  };

  const validate = async (data: UserData) => {
    let newError = { ...error };
    // debugger;

    if (
      data.oldpassword == "" ||
      data.password == "" ||
      data.confirmPassword == ""
    ) {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    }
    // else if (data.oldpassword !== userLogined?.password) {
    //   newError.status = true;
    //   newError.errorMsg = "Mật khẩu cũ không chính xác";
    // }
    else if (data.oldpassword == data.password) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu mới không được trùng với mật khẩu cũ";
    } else if (data.password !== data.confirmPassword) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu nhập lại không chính xác";
    } else if (data.password.length < 6) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được ngắn hơn 6 ký tự";
    } else if (data.password.length > 200) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được dài quá 200 ký tự";
    } else if (
      !(
        data.password.match(/[a-z]/) &&
        data.password.match(/[A-Z]/) &&
        data.password.match(/\d/)
      )
    ) {
      newError.status = true;
      newError.errorMsg =
        "Mật khẩu cần bao gồm ký tự IN HOA, chữ thường và chữ số";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }

    await setError(newError); // Cập nhật error
  };

  return (
    <Container style={{ width: "100%", maxWidth: "600px" }}>
      <ul className="nav">
        <li className="nav-item"></li>
        <nav className="set-header">
          <li className="navbar"></li>
          <div id="renderButtonHeader"></div>
        </nav>
      </ul>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", padding: "20px" }}>ĐỔI MẬT KHẨU</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            disabled
            type="email"
            className="form-control"
            id="email"
            value={userLogined?.email}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu cũ<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="oldpassword"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Nhập lại mật khẩu<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="confirmPassword"
          />
        </div>
        <h6 style={{ color: "Grey", textAlign: "center" }}>
          Nếu bạn cần hỗ trợ, vui lòng
          <Link to="/contactUs">
            <span
              style={{ color: "Black", paddingLeft: "5px", cursor: "pointer" }}
            >
              liên hệ với chúng tôi
            </span>
          </Link>
        </h6>

        {error.isShowStatus == true && error.status == true && (
          <p
            id="Error"
            style={{ color: "#a11515", padding: "20px", textAlign: "center" }}
          >
            {error.errorMsg}
          </p>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            style={{ display: "inline-block", width: "30%" }}
            type="submit"
            className="btn btn-dark"
          >
            Xác nhận
          </button>
        </div>
      </form>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ alignItems: "center" }}
        className="modalCenter"
      >
        <Modal.Header className="modalCenter">
          <h5>Mật khẩu đã được đổi thành công</h5>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px", textAlign: "center" }}>
          Bạn cần đăng nhập bằng mật khẩu mới vào lần tới.
        </Modal.Body>
        <Modal.Footer className="modalCenter">
          <Button variant="secondary" onClick={handleClose}>
            Quay lại trang thông tin người dùng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BoxChangePass;
