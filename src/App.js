import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import NavBar from "./components/NavBar";
import PdfPreview from "./components/PdfPreview";

function App() {

  const [pdfUri, setPdfUri] = useState(null);
  const updatePdfUri = (uri) => {
    setPdfUri(uri);
  }

  return (
    <Router>
      <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element = {<Form updatePdfUri={updatePdfUri}/>} />
        <Route exact path="/pdfPreview" element = {<PdfPreview iframeSrc = {pdfUri} />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
