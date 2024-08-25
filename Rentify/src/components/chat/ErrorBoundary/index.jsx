import { Container, Alert } from "react-bootstrap";

const ErrorBoundary = ({ error }) => (
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <Alert variant="danger">{error}</Alert>
  </Container>
);

export default ErrorBoundary;
