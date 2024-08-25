import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import LogoImage from "@/assets/images/RentifyLogo.png";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg">
      <Navbar.Brand
        style={{ minWidth: "150px", width: "150px" }}
        className=""
        href="/Home"
      >
        <Image fluid className="brand-logo" src={LogoImage} alt="Logo" />
      </Navbar.Brand>

      <Navbar.Toggle className="" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container
          fluid
          className="d-flex text-nowrap flex-lg-row flex-column gap-3 text-center  justify-content-between nav-items-container"
        >
          <Nav className="gap-2 fs-6">
            <Nav.Link className="" href="/Home">
              الصفحة الرئيسية
            </Nav.Link>

            <Nav.Link href="#how-it-works">كيف يعمل الموقع</Nav.Link>
            <Nav.Link href="#about-us">من نحن</Nav.Link>
          </Nav>

          <Nav className="gap-2 col-lg-auto col-12 col-sm-10 m-lg-0 m-auto">
            <Button
              type="submit"
              onClick={() => navigate("/AddItem")}
              size="sm"
              variant="primary"
              className="text-nowrap  text-white"
            >
              انشر إعلان
            </Button>
            <Button size="sm" variant="secondary" className="text-nowrap">
              إنشاء حساب
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              className="text-nowrap"
            >
              تسجيل الدخول
            </Button>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}
