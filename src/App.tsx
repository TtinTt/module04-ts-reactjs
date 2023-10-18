import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, FC } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePass from "./pages/ChangePass";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ContactUs from "./pages/ContactUs";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AboutUsPage from "./pages/AboutUsPage";
import QnAPage from "./pages/QnAPage";
import ResetPass from "./pages/ResetPass";
import AboutProductPage from "./pages/AboutProductPage";
import Profile from "./pages/Profile";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
  Changedot,
} from "../src/function/functionData";
import productApi from "./apis/product.api";
import { State } from "./types-unEdit/StateReducer";

const App: FC = () => {
  const state = useSelector((state: State) => state);
  let adminLogined = useSelector(
    (state: State) => state.adminReducer.adminLogined
  );

  useEffect(() => {
    localStorage.setItem("reduxState", JSON.stringify(state));
  }, [state]);

  const getTag = async () => {
    try {
      const data = await productApi.getTag({});
      setTagsProducts(data.tags);
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        console.log(error.response?.statusText);
      } else {
        console.log(error.response?.statusText);
      }
    }
  };

  const [tagsProducts, setTagsProducts] = useState<string[]>([]); // Giả định rằng tags là chuỗi

  useEffect(() => {
    getTag();
  }, []);

  const catalogue = tagsProducts.map((tag) => {
    let urlLink = "/" + tag.toLowerCase();
    return <Route path={urlLink} element={<Home />} />;
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/resetPass" element={<ResetPass />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/aboutUs" element={<AboutUsPage />} />
      <Route path="/QnA" element={<QnAPage />} />
      <Route path="/aboutProduct" element={<AboutProductPage />} />
      <Route
        path="/admin"
        element={adminLogined == null ? <AdminLogin /> : <Admin />}
      />
      {catalogue}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
