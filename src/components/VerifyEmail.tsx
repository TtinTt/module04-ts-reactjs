import React, { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../css/Cart.css";
import userApi from "../apis/user.api";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ token }) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const navigate = useNavigate();

  const handleVerifyEmail = async (): Promise<void> => {
    try {
      await userApi.sentVerificationToken(token);
      setIsVerified(true);
      console.log("đã gửi token");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, [token]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerified && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      navigate("/");
    }

    return () => clearTimeout(timer);
  }, [isVerified, countdown, navigate]);

  return (
    <>
      <div className="imgPageTop">
        <h1 className="text-center msgPageTop">
          {isVerified
            ? `Đã xác minh email, quay lại trang chủ sau ${countdown} giây`
            : `Xác minh email`}
        </h1>
      </div>
    </>
  );
};

export default VerifyEmail;
