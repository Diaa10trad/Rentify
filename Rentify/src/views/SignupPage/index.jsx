import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SectionLine from "@/components/SectionLine";

function SignupPage() {
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={11} md={8} className="shadow-lg p-4 rounded-5 ">
          <Stack className="align-items-center mb-2">
            <h2 className="text-center">إنشاء حساب جديد</h2>
            <SectionLine backgroundColor="bg-primary" />
          </Stack>

          <Form>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>الاسم الأول</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم الأول"
                required
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>الاسم الأخير</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم الأخير"
                required
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
              />
            </Form.Group>

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

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>كلمة السر</Form.Label>
              <Form.Control
                type="password"
                placeholder="أدخل كلمة السر"
                required
                className="border border-0 p-2"
                style={{ backgroundColor: "#f4f9f9" }}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-5">
              <Form.Label>تأكيد كلمة السر</Form.Label>
              <Form.Control
                type="password"
                placeholder="أعد إدخال كلمة السر"
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
              إنشاء حساب
            </Button>

            <div className="mt-4 text-center">
              <p
                className="mb-1 fw-normal "
                style={{ color: "#8a909a", fontSize: "13px" }}
              >
                لديك حساب؟
              </p>
              <Link to="/Login">تسجيل الدخول</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
