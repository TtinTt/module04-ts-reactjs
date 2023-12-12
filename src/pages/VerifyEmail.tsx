import React from "react";
import Container from "react-bootstrap/Container";
import VerifyEmail from "../components/VerifyEmail";

import "../css/Home.css";
import { useSearchParams } from "react-router-dom";

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  return (
    <Container>
      <VerifyEmail token={token} />
    </Container>
  );
};

export default VerifyEmailPage;
