import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Fooditem from "./pages/Fooditem";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/fooditem" element={<Fooditem />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/signup" element={<Signup />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
