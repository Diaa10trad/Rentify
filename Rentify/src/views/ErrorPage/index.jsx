import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ErrorPage({ message }) {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="text-center">
          <h1 className="display-4 text-danger">خطأ</h1>
          <p className="lead">
            {message || "ليس لديك صلاحية الوصول إلى هذه الصفحة."}
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            العودة إلى الصفحة الرئيسية
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;
