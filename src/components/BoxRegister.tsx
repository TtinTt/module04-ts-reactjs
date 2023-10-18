import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import authApi from "../apis/auth.api";

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

  const handleGetInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
    await validate(user);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await validate(user);
    if (!error.status) return;

    // Call API here...
  };

  const validate = async (data: UserForm) => {
    // Your validation code...
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
            Email
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
            Mật khẩu
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
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="confirmPassword"
          />
        </div>
        <h6 style={{ color: "Grey", textAlign: "center" }}>
          Nếu bạn đã có tài khoản, vui lòng
          <Link to="/login">
            <span
              style={{ color: "Black", paddingLeft: "5px", cursor: "pointer" }}
            >
              đăng nhập
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
    </Container>
  );
}
