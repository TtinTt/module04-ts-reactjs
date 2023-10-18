import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../actions/userAction";
import { State } from "../types-unEdit/StateReducer";
import "../css/Cart.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );

  useEffect(() => {
    if (userLogined) {
      dispatch(clearCart());
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }, [userLogined, dispatch, navigate]);

  return (
    <div className="imgPageTop">
      <h1 className="text-center msgPageTop">Trang không tồn tại.</h1>
    </div>
  );
}

export default NotFound;
