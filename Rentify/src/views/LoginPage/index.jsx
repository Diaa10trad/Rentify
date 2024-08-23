import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SectionLine from "@/components/SectionLine";

function LoginPage() {
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Col xs={11} md={8} className="shadow-lg p-4 rounded-5 ">
          <Stack className="align-items-center mb-2">
            <h2 className="text-center">تسجيل الدخول</h2>
            <SectionLine backgroundColor="bg-primary" />
          </Stack>

          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                required
                style={{ textAlign: "right", backgroundColor: "#f4f9f9" }}
                className="border border-0 p-2"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-5">
              <Form.Label>كلمة السر</Form.Label>
              <Form.Control
                type="password"
                placeholder="أدخل كلمة السر"
                required
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="text-white w-100 rounded-5"
            >
              تسجيل الدخول
            </Button>

            <div className="mt-4 text-center">
              <p
                className="mb-1 fw-normal "
                style={{ color: "#8a909a", fontSize: "13px" }}
              >
                ليس لديك حساب؟
              </p>
              <Link to="/SignUp">إنشاء حساب جديد</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
