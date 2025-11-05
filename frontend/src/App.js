import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Fooditem from "./pages/Fooditem";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Loginup from "./pages/Loginup";
import Admindashboard from "./pages/Admindashboard";
import Customerdashboard from "./pages/Customerdashboard";
import Addfoodproduct from "./foodservice/Addfoodproduct";
import Upadatefooditem from "./foodservice/Upadatefooditem";
import Sendorder from "./orderservice/Sendorder";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/fooditem" element={<Fooditem />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/loginup" element={<Loginup />}></Route>
        <Route
          exact
          path="/admindashboard"
          element={<Admindashboard />}
        ></Route>
        <Route
          exact
          path="/customerdashboard"
          element={<Customerdashboard />}
        ></Route>
        <Route
          exact
          path="/addfoodproduct"
          element={<Addfoodproduct />}
        ></Route>
        <Route
          exact
          path="/updatefooditem"
          element={<Upadatefooditem />}
        ></Route>
        <Route exact path="/sendorder" element={<Sendorder />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
