import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";

import { UserLogined, User } from "../types-unEdit/User";
import { State } from "../types-unEdit/StateReducer";

interface UserForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorType {
  isShowStatus: boolean;
  status: boolean;
  errorMsg: string;
}

export default function BoxRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  const userLogined = useSelector<State, UserLogined | null>(
    (state) => state.userReducer.userLogined
  );

  const usersDB = useSelector<State, User[]>(
    (state) => state.userReducer.users
  );

  const [user, setUser] = useState<UserForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<ErrorType>({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  useEffect(() => {
    if (userLogined !== null) navigate("/");
  }, [usersDB, navigate]);

  const handleGetInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
    const validationError = await validate(user);
    setError(validationError);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRegister && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      authApi
        .login(user.email, user.password, "customer")
        .then((response) => {
          console.log("response login:", response);
          console.log("response.token login:", response.token);
          window.localStorage.setItem("userToken", response.token);
          navigate("/");
        })
        .catch((error) => {
          console.log("response login error:", error);
          if (error.response?.status == "406") {
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

    return () => clearTimeout(timer);
  }, [isRegister, countdown, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(user);

    event.preventDefault();
    const validationError = await validate(user);

    if (validationError.status) {
      setError({ ...validationError, isShowStatus: true });
      return;
    } else {
      userApi
        .register({ email: user.email, password: user.password })
        .then((response) => {
          setIsRegister(true);
          // navigate("/login");
        })
        .catch((error) => {
          // alert(error.response.statusText);
          setError({
            isShowStatus: true,
            status: true,
            errorMsg: "Tài khoản đã tồn tại hoặc thông tin không hợp lệ.",
          });
        });
    }
  };

  const validate = async (data: UserForm): Promise<ErrorType> => {
    let newError: ErrorType = {
      isShowStatus: false,
      status: false,
      errorMsg: "",
    };
    if (!data.email || !data.password || !data.confirmPassword) {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống.";
      // newError.isShowStatus = true;
    } else if (data.password !== data.confirmPassword) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu nhập lại không chính xác.";
      // newError.isShowStatus = true;
    } else if (data.password.length < 6) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được ngắn hơn 6 ký tự.";
      // newError.isShowStatus = true;
    } else if (
      !data.password.match(/[a-z]/) ||
      !data.password.match(/[A-Z]/) ||
      !data.password.match(/\d/)
    ) {
      newError.status = true;
      newError.errorMsg =
        "Mật khẩu cần bao gồm ký tự IN HOA, chữ thường và chữ số.";
      // newError.isShowStatus = true;
    }
    return newError;
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
        <h3 style={{ textAlign: "center", padding: "20px" }}>ĐĂNG KÝ</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(event) => handleGetInput(event)}
            aria-describedby="emailHelp"
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
        {!isRegister ? (
          <h6 style={{ color: "Grey", textAlign: "center" }}>
            Nếu bạn đã có tài khoản, vui lòng
            <Link to="/login">
              <span
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
              >
                đăng nhập
              </span>
            </Link>
          </h6>
        ) : (
          <>
            <p
              style={{
                color: "Grey",
                textAlign: "center",
                marginBottom: "3px",
              }}
            >
              Đăng ký thành công! Chuyển đến trang chủ sau {countdown} giây.
            </p>
            <p
              style={{
                color: "Grey",
                textAlign: "center",
                // marginBottom: "3px",
              }}
            >
              Chúng tôi đã gửi một Email xác nhận đến{" "}
              <strong>{user.email}</strong>.
            </p>
          </>
        )}

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
    </Container>
  );
}
