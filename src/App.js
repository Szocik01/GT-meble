import { Fragment, useEffect, useLayoutEffect } from "react";
import "./App.css";
import Navigation from "./components/NavigationComponents/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { navigationColorActions, loginDataActions } from "./storage/redux";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Popup from "./UI/Popup";
import PageNotFound from "./pages/PageNotFound";
import Realizations from "./pages/Realizations";
import RealizationDetail from "./pages/RealizationDetail";
import Admin from "./pages/Admin";
import Footer from "./components/FooterComponents/Footer";

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

  useLayoutEffect(() => {
    const cookiesArray = document.cookie.split(";");
    for (const cookie of cookiesArray) {
      const cookieArray = cookie.split("=");
      if (cookieArray[0].trim() === "token") {
        dispatch(loginDataActions.setTokenInRedux({ token: cookieArray[1] }));
      }
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<Navigation />}>
          <Route element={<Footer />}>
            <Route path="/realizations" element={<Realizations />} />
            <Route
              path="realization/:realizationId"
              element={<RealizationDetail />}
            />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
        {!token && <Route path="/login" element={<Login />} />}
        {token && (
          <Route
            path="/login"
            element={<Navigate to="/admin/realizations" />}
          />
        )}
        {token && <Route path="/admin/*" element={<Admin />} />}
      </Routes>
      {isPopUpVisible ? <Popup disappearTimeMs={5000} /> : ""}
    </Fragment>
  );
}

export default App;
