import { Fragment, useEffect } from "react";
import "./App.css";
import Navigation from "./components/NavigationComponents/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { navigationColorActions, loginDataActions } from "./storage/redux";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import Prices from "./pages/Prices";
import Login from "./pages/Login";
import AddEditProduct from "./pages/AddEditProduct";
import { Routes, Route } from "react-router-dom";
import ScrollUpButton from "./UI/ScrollUpButton";
import Logo from "./UI/Logo";
import Popup from "./UI/Popup";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.loginData.token;
  });

  const isPopUpVisible = useSelector((state) => {
    return state.popUpInfo.isVisible;
  });

  //Wykrywa czy ekran został zescrollowany by następnie zmienić styl nav i sidebara.
  useEffect(() => {
    document.addEventListener("scroll", (event) => {
      if (event.target.documentElement.scrollTop > 0) {
        dispatch(navigationColorActions.scrollingDetection(true));
      } else {
        dispatch(navigationColorActions.scrollingDetection(false));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const cookiesArray = document.cookie.split(";");
    for (const cookie of cookiesArray) {
      const cookieArray = cookie.split("=");
      if (cookieArray[0] === "token") {
        dispatch(loginDataActions.setTokenInRedux({ token: cookieArray[1] }));
      }
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Navigation />
      <Logo />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {!token && <Route path="/login" element={<Login />} />}
        {token && <Route path="/product" element={<AddEditProduct />} />}
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      {isPopUpVisible ? <Popup disappearTimeMs={7000} /> : ""}
      <ScrollUpButton />
    </Fragment>
  );
}

export default App;
