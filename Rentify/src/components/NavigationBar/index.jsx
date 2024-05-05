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

export default function NavigationBar() {
  return (
    <Navbar className="border border-dark" expand="lg">
      <Navbar.Brand
        style={{ minWidth: "150px", width: "150px" }}
        className=""
        href="#home"
      >
        <Image fluid className="brand-logo" src={LogoImage} alt="Logo" />
      </Navbar.Brand>

      <Navbar.Toggle className="" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container
          fluid
          className="d-flex text-nowrap border border-dark flex-lg-row flex-column gap-5 text-center  justify-content-between nav-items-container"
        >
          <Nav className="border border-primary gap-3 fs-6">
            <Nav.Link className="" href="#home">
              الصفحة الرئيسية
            </Nav.Link>

            <NavDropdown
              title="الفئات"
              id="basic-nav-dropdown"
              renderMenuOnMount={true}
            >
              <NavDropdown.Item href="#action/3.1">الكترونيات</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">ملابس </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                أدوات صيانة
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4"> أخرى </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#how-it-works">كيف يعمل الموقع</Nav.Link>
            <Nav.Link href="#about-us"> من نحن </Nav.Link>
          </Nav>

          <Nav className="gap-3">
            <Button variant="primary" className="text-nowrap text-white">
              انشر إعلان
            </Button>
            <Button variant="secondary" className="text-nowrap">
              إنشاء حساب
            </Button>
            <Button variant="outline-secondary" className="text-nowrap">
              تسجيل الدخول
            </Button>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}
