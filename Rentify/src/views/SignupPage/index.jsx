import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Stack,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SectionLine from "@/components/SectionLine";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError("كلمة السر يجب أن تحتوي على أحرف كبيرة وصغيرة، أرقام، ورموز.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمة السر غير متطابقة.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5079/api/account/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }
      );

      const { token, id } = response.data;
      login(token, id);

      navigate("/Home");
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setError("البريد الإلكتروني مستخدم بالفعل.");
      } else {
        setError("فشل التسجيل، يرجى المحاولة مرة أخرى.");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center mt-5 mb-5">
        <Col xs={11} md={8} className="shadow-lg p-4 rounded-5 ">
          <Stack className="align-items-center mb-2">
            <h2 className="text-center">إنشاء حساب جديد</h2>
            <SectionLine backgroundColor="bg-primary" />
          </Stack>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>الاسم الأول</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم الأول"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
