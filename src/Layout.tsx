import NavbarTop from "./components/NavbarTop";
import FooterBot from "./components/FooterBot";
import Container from "react-bootstrap/Container";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      {children}
      <FooterBot />
    </Container>
  );
};

export default Layout;
