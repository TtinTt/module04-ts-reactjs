// import { FC, ChangeEvent, FormEvent, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useSelector, useDispatch } from "react-redux";
// import { Changedot, getCurrentTimeString } from "../../function/functionData";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Container from "react-bootstrap/Container";
// import Modal from "react-bootstrap/Modal";
// import authApi from "../../apis/auth.api";
// import "../../css/Cart.css";
// import { loginAdmin } from "../../actions/adminAction";

// import { Admin, AdminState } from "../../types-unEdit/Admin"; // Import types

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface ErrorState {
//   isShowStatus: boolean;
//   status: boolean;
//   errorMsg: string;
// }

// const AdminLoginBox: FC = () => {
//   let admins = useSelector(
//     (state: any) => state.adminReducer.admins as Admin[]
//   ); // Specify the type of state if it is known
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   let [admin, setAdmin] = useState<LoginData>({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState<ErrorState>({
//     isShowStatus: false,
//     status: false,
//     errorMsg: "",
//   });

//   const handleGetInput = async (event: ChangeEvent<HTMLInputElement>) => {
//     const newAdmin = { ...admin, [event.target.id]: event.target.value };
//     setAdmin(newAdmin);
//     await validate(newAdmin);
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     await validate(admin);
//     if (error.status) {
//       setError({ ...error, isShowStatus: true });
//       return;
//     }

//     authApi
//       .login(admin.email, admin.password, "admin")
//       .then((response) => {
//         console.log(response);
//         window.localStorage.setItem("X-API-Key-Admin", response.token);
//         window.location.reload();
//       })
//       .catch((error: any) => {
//         if (error.response?.status == "406") {
//           setError({
//             isShowStatus: true,
//             status: true,
//             errorMsg:
//               "Tài khoản bị vô hiệu hóa, vui lòng liên hệ với quản trị viên cao nhất để biết thêm thông tin.",
//           });
//         } else {
//           setError({
//             isShowStatus: true,
//             status: true,
//             errorMsg: "Email không tồn tại hoặc mật khẩu không chính xác.",
//           });
//         }
//         console.log(error);
//       });
//   };

//   const validate = async (data: LoginData) => {
//     let newError = { ...error };

//     if (data.email === "" || data.password === "") {
//       newError.status = true;
//       newError.errorMsg = "Các thông tin không được để trống";
//     } else {
//       newError = { isShowStatus: false, status: false, errorMsg: "" };
//     }
//     setError(newError);
//   };

//   return (
//     <>
//       {" "}
//       <Container style={{ width: "600px" }}>
//         <ul className="nav">
//           <li className="nav-item"></li>
//           <nav className="set-header">
//             <li className="navbar"></li>
//             <div id="renderButtonHeader"></div>
//           </nav>
//         </ul>
//         <form onSubmit={handleSubmit}>
//           <h3 style={{ textAlign: "center", padding: "20px" }}>
//             ĐĂNG NHẬP ADMIN
//           </h3>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               onChange={(event) => handleGetInput(event)}
//               type="email"
//               className="form-control"
//               id="email"
//               aria-describedby="emailHelp"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Mật khẩu
//             </label>
//             <input
//               onChange={(event) => handleGetInput(event)}
//               type="password"
//               className="form-control"
//               id="password"
//             />
//           </div>
//           <h6 style={{ color: "Grey", textAlign: "center" }}>
//             Nếu bạn quên mật khẩu, vui lòng
//             <Link to="/contactUs">
//               <span
//                 style={{
//                   color: "Black",
//                   paddingLeft: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 liên hệ người quản trị.
//               </span>
//             </Link>
//           </h6>
//           {error.isShowStatus == true && error.status == true && (
//             <p
//               id="Error"
//               style={{
//                 textAlign: "center",
//                 color: "#a11515",
//                 padding: "20px",
//               }}
//             >
//               {error.errorMsg}
//             </p>
//           )}{" "}
//           <div style={{ textAlign: "center" }}>
//             <button
//               style={{ display: "inline-block", width: "30%" }}
//               type="submit"
//               className="btn btn-dark"
//             >
//               Xác nhận
//             </button>
//           </div>
//         </form>
//       </Container>
//     </>
//     //
//   );
// };

// export default AdminLoginBox;
