import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "@/styles/css/main.rtl.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import HomePage from "@/views/HomePage";
import AddListingPage from "@/views/AddListingPage";
import ResultsPage from "@/views/ResultsPage";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        {/* <Container fluid>
          <Col> */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Sign-in" element={<HomePage />} />
          <Route path="/Register" element={<HomePage />} />
          <Route path="/About-Rentify" element={<HomePage />} />
          <Route path="/Results" element={<ResultsPage />} />
          <Route path="/AddItem" element={<AddListingPage />} />
        </Routes>
        {/* </Col>
        </Container> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
