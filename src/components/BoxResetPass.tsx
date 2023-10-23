import { FC, useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Pagination,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";
import { loginUser } from "../actions/userAction";
import {
  removeAccentsUpperCase,
  HandleFilter,
  getCurrentTimeString,
} from "../function/functionData";
import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import { State } from "../types-unEdit/StateReducer";
import { User } from "../types-unEdit/User";

interface UserFormData {
  email: string;
  codeResetPass: string;
  password: string;
  confirmPassword: string;
  user_id?: number; // I added this because of the `user?.user_id` you used in the `resetPassByApi` function.
}

interface ValidationError {
  isShowStatus: boolean;
  status: boolean;
  errorMsg: string;
}

const BoxResetPass: FC = () => {
  const usersDB: User[] = useSelector(
    (state: State) => state.userReducer.users
  );
  const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<UserFormData>({
    email: "",
    codeResetPass: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<ValidationError>({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  const handleClose = (): void => {
    setShow(false);
    navigate("/login");
  };

  const handleShow = (): void => setShow(true);

  const handleGetInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedUser = {
      ...user,
      [id]: value,
    };
    setUser(updatedUser);
    await validate(updatedUser);
  };

  const resetPassByApi = (): void => {
    const formData = new FormData();
    formData.append("password", user.password);
    userApi
      .updateUser(user?.user_id!, formData) // Using '!' because the type may be undefined. Make sure it's safe.
      .then(() => {
        authApi
          .getAuth()
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            dispatch(loginUser(null));
            localStorage.removeItem("X-API-Key");
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
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await validate(user);
    const currentError = { ...error }; // Lấy giá trị mới của error sau khi validate

    if (currentError.status) {
      await setError({ ...currentError, isShowStatus: true });
      return;
    } else {
      userApi
        .resetPass(user.email, user.codeResetPass, user.confirmPassword)
        .then((response) => {
          console.log(response);
          setShow(true);
        })
        .catch((error) => {
          console.log(error);
          setError({
            isShowStatus: true,
            status: true,
            errorMsg:
              "Tài khoản không tồn tại hoặc mã xác minh không chính xác",
          });
        });
    }
  };

  const handleSubmitCheckEmail = async (
    event: React.FormEvent
  ): Promise<void> => {
    event.preventDefault();
    await validateEmail(user);
    if (error.status) {
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      setIsCheckedEmail(true);
      userApi
        .sendCodeResetPass(user.email)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validateEmail = async (data: UserFormData): Promise<void> => {
    let newError: ValidationError = { ...error };
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (data.email == "") {
      newError.status = true;
      newError.errorMsg = "Email không được để trống";
    } else if (!regex.test(data.email)) {
      newError.status = true;
      newError.errorMsg = "Email không hợp lệ";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }

    setError(newError);
  };

  const validate = async (data: UserFormData): Promise<void> => {
    let newError: ValidationError = { ...error };

    console.log(data);
    console.log(error);

    if (
      data.codeResetPass == "" ||
      data.password == "" ||
      data.confirmPassword == ""
    ) {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    } else if (data.codeResetPass == data.password) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu mới không được trùng với mã xác minh";
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
    console.log(newError);

    setError(newError);
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

      {isCheckedEmail && (
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center", padding: "20px" }}>
            ĐẶT LẠI MẬT KHẨU
          </h3>

          <p>
            Nếu email <strong>{user?.email}</strong> khớp với một tài khoản đã
            đăng ký, bạn sẽ nhận được một <strong>mã xác minh</strong> để đặt
            lại mật khẩu, mã chỉ có hiệu lực trong vòng 5 phút.
          </p>
          <hr></hr>

          <div className="mb-3">
            <label
              style={{
                width: "100%",
              }}
              htmlFor="codeResetPass"
              className="form-label"
            >
              Mã xác nhận
              <strong
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                  float: "right",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Không nhận được mã ?
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => handleGetInput(event)}
              id="codeResetPass"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu mới
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
            Nếu bạn cần hỗ trợ, vui lòng
            <Link to="/contactUs">
              <span
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
              >
                liên hệ với chúng tôi.
              </span>
            </Link>
          </h6>

          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                color: "#a11515",
                padding: "20px",
                textAlign: "center",
              }}
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
      )}

      {!isCheckedEmail && (
        <form onSubmit={handleSubmitCheckEmail}>
          <h3 style={{ textAlign: "center", padding: "20px" }}>
            ĐẶT LẠI MẬT KHẨU
          </h3>{" "}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user?.email}
              aria-describedby="emailHelp"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {/* <hr></hr> */}
          <p style={{ textAlign: "center" }}>
            Nếu email của bạn khớp với một tài khoản đã đăng ký, bạn sẽ nhận
            được một <strong>mã xác minh</strong> để đặt lại mật khẩu, mã chỉ có
            hiệu lực trong vòng 5 phút.
          </p>
          <h6 style={{ color: "Grey", textAlign: "center" }}>
            Nếu bạn cần hỗ trợ, vui lòng
            <Link to="/contactUs">
              <span
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
              >
                liên hệ với chúng tôi.
              </span>
            </Link>
          </h6>
          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                color: "#a11515",
                padding: "20px",
                textAlign: "center",
              }}
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
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ alignItems: "center" }}
        className="modalCenter"
      >
        <Modal.Header className="modalCenter">
          <h5>Mật khẩu đã được đặt lại thành công</h5>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px", textAlign: "center" }}>
          Hãy đăng nhập bằng mật khẩu mới.
        </Modal.Body>
        <Modal.Footer className="modalCenter">
          <Button variant="secondary" onClick={handleClose}>
            Quay lại trang đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default BoxResetPass;
