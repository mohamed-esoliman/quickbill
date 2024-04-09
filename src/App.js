import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element = {<Form />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
