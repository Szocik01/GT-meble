import { Fragment, useEffect } from "react";
import "./App.css";
import Navigation from "./components/NavigationComponents/Navigation";
import { useDispatch } from "react-redux";
import { navigationColorActions } from "./storage/redux";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import Prices from "./pages/Prices";
import { Routes, Route } from "react-router-dom";

function App() {

  const dispatch =useDispatch();
  useEffect(() => {
    document.addEventListener("scroll", (event) => {
      if(event.target.documentElement.scrollTop>0)
      {
        dispatch(navigationColorActions.scrollingDetection(true));
      }
      else
      { 
        dispatch(navigationColorActions.scrollingDetection(false));
      }
    });
  },[dispatch]);

  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/prices" element={<Prices/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
     </Fragment>
  );
}

export default App;