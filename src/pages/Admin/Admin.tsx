// Import các thư viện và component cần thiết
import NavbarTop from "../../components/NavbarTop";
import FooterBot from "../../components/FooterBot";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AdminBox from "../../components/Admin/AdminBox";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ManageUser from "../../components/Admin/ManageUser";
import ManageOrder from "../../components/Admin/ManageOrder";
import ManageMess from "../../components/Admin/ManageMess";
import ManageAdmin from "../../components/Admin/ManageAdmin";
import ManageProduct from "../../components/Admin/ManageProduct";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Import stylesheet
import "../../css/Home.css";

// Xác định kiểu dữ liệu cho props (nếu có)
interface AdminProps {
  // Các props sẽ đi vào đây
}

const Admin: React.FC<AdminProps> = (props) => {
  // Các hooks và state
  const navigate = useNavigate();
  const [showing, setShowing] = useState<number>(1);
  const [key, setKey] = useState<string>("order");

  // Render JSX
  return (
    <Container>
      <div>
        <NavbarTop />
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k: string | null) => k && setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="order" title="Đơn hàng">
          <ManageOrder />
        </Tab>

        <Tab eventKey="products" title="Sản phẩm">
          <ManageProduct />
        </Tab>

        <Tab eventKey="user" title="Người dùng">
          <ManageUser />
        </Tab>

        <Tab eventKey="contact" title="Lời nhắn">
          <ManageMess />
        </Tab>

        <Tab eventKey="admin" title="Quản trị viên">
          <ManageAdmin />
        </Tab>
      </Tabs>

      <FooterBot />
    </Container>
  );
};

export default Admin;
