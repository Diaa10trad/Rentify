import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "@/styles/css/main.rtl.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/views/HomePage";
import AddListingPage from "@/views/AddListingPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Sign-in" element={<HomePage />} />
          <Route path="/Register" element={<HomePage />} />
          <Route path="/About-Rentify" element={<HomePage />} />
          <Route path="/Add-Listing" element={<AddListingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
