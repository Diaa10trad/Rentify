import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import LogoImage from "../../assets/images/RentifyLogo.png";
import "./styles.css";

export default function NavigationBar() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#home">
        <Image className="brand-logo" src={LogoImage} alt="Logo" fluid />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container className="d-flex justify-content-between nav-items-container">
          <Nav className="lg nav-links-container">
            <Nav.Link href="#home">الصفحة الرئيسية</Nav.Link>

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

          <Nav className="nav-btns-container">
            <Button
              variant="primary"
              className="mr-2 nav-btn add-newlisting-btn"
            >
              انشر إعلان
            </Button>
            <Button variant="secondary" className="mr-2 nav-btn">
              إنشاء حساب
            </Button>
            <Button variant="outline-secondary" className="nav-btn">
              تسجيل الدخول
            </Button>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}
