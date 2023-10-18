import React from "react";
import NavbarTop from "../../components/NavbarTop";
import FooterBot from "../../components/FooterBot";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AdminLoginBox from "../../components/Admin/AdminLoginBox";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../css/Home.css";

// Nếu bạn có kiểu dữ liệu cho state từ redux, hãy khai báo ở đây
// Ví dụ:
// interface AdminLoginState {
//   // ...your state types here
// }

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const adminLoginState = useSelector((state: RootState) => state.adminLogin); // Gỉa sử RootState là kiểu dữ liệu của toàn bộ state

  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <AdminLoginBox />
      <FooterBot />
    </Container>
  );
};

export default AdminLogin;
