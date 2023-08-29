import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Banner from "./Component/Banner/Banner";
import BlockSection from "./Component/BlockSection/BlockSection";
import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";
import Navbar from "./Component/Navbar/Navbar";
import './style.css'
import ProductView from "./Component/ProductView/ProductView";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import View from "./Pages/View";
import Create from "./Pages/Create";
import LoaderContext from "./Context/LoaderContext";
import Loading from "./Component/util/Loading";

function App() {


  return (
    <div>


      <LoaderContext>
        <Router>
          <Loading></Loading>
          <Header></Header>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}> </Route>
            <Route path="/login" element={<Login />}> </Route>
            <Route path="/signup" element={<Signup />}> </Route>
            <Route path="/viewProduct/:id" element={<View />}> </Route>
            <Route path="/create" element={<Create />}> </Route>
          </Routes>
        </Router>


        <Footer></Footer>
      </LoaderContext>

    </div>
  );
}

export default App;
