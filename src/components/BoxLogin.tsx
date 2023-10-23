import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import authApi from "../apis/auth.api";
import { UserLogined, UserState } from "../types-unEdit/User";
import { State } from "../types-unEdit/StateReducer";

interface ErrorState {
  isShowStatus: boolean;
  status: boolean;
  errorMsg: string;
}

interface UserData {
  email: string;
  password: string;
}

export default function BoxLogin() {
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined as UserLogined | null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData>({
    email: "",
    password: "",
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await validate(user);
    if (error.status) {
      setError({ ...error, isShowStatus: true });
      return;
    } else {
      authApi
        .login(user.email, user.password, "customer")
        .then((response) => {
          window.localStorage.setItem("X-API-Key", response.token);
          navigate("/");
        })
        .catch((error) => {
          if (error.response?.status === "406") {
            setError({
              isShowStatus: true,
              status: true,
              errorMsg:
                "Tài khoản bị vô hiệu hóa, vui lòng liên hệ với quản trị viên để biết thêm thông tin.",
            });
          } else {
            setError({
              isShowStatus: true,
              status: true,
              errorMsg: "Email không tồn tại hoặc mật khẩu không chính xác.",
            });
          }
        });
    }
  };

  const validate = async (data: UserData) => {
    console.log(data);

    const newError: ErrorState = { ...error };

    if (data.email === "" || data.password === "") {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    } else {
      newError.isShowStatus = false;
      newError.status = false;
      newError.errorMsg = "";
    }
    console.log(newError);
    setError(newError);
  };

  return (
    <Container style={{ width: "600px" }}>
      <ul className="nav">
        <li className="nav-item"></li>
        <nav className="set-header">
          <li className="navbar"></li>
          <div id="renderButtonHeader"></div>
        </nav>
      </ul>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", padding: "20px" }}>ĐĂNG NHẬP</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(event) => handleGetInput(event)}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
            style={{
              width: "100%",
            }}
          >
            Mật khẩu{" "}
            <strong
              style={{
                color: "Black",
                paddingLeft: "5px",
                cursor: "pointer",
                float: "right",
              }}
            >
              <Link to="/resetPass">Quên mật khẩu ?</Link>
            </strong>
          </label>
          <input
            onChange={(event) => handleGetInput(event)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <h6 style={{ color: "Grey", textAlign: "center" }}>
          Nếu bạn chưa có tài khoản, vui lòng
          <Link to="/register">
            <strong
              style={{ color: "Black", paddingLeft: "5px", cursor: "pointer" }}
            >
              đăng ký
            </strong>
            .
          </Link>
        </h6>
        {error.isShowStatus == true && error.status == true && (
          <p
            id="Error"
            style={{ textAlign: "center", color: "#a11515", padding: "20px" }}
          >
            {error.errorMsg}
          </p>
        )}{" "}
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
    </Container>
  );
}
