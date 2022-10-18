import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { positionActions } from "../../storage/redux";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

export default React.memo(function Navbar(props) {
  const { isUnfolded, setIsUnfolded, logoutHandler } = props;

  const dispatch = useDispatch();

  const positions = useSelector((state) => {
    return state.sidebarPosition;
  });

  const isScrolled = useSelector((state) => {
    return state.navigationColor.isScrolled;
  });

  const token = useSelector((state) => {
    return state.loginData.token;
  });

  function hoverPositionChangeHandler(number) {
    dispatch(positionActions.hoverPositionChange(number));
  }

  function onLeavePositionChangeHandler() {
    dispatch(positionActions.onLeavePositionChange());
  }

  function unfoldingHandler() {
    setIsUnfolded((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <nav className={`${style.navbar} ${isScrolled ? style.scrolled : ""}`}>
      <div
        className={`${style.hamburger} ${isUnfolded ? style.unfolded : ""}`}
        onClick={unfoldingHandler}
      ></div>
      <div
        className={style.linksContainer}
        onMouseLeave={onLeavePositionChangeHandler}
      >
        <div
          className={`${style.tagger} ${
            style[`position${positions.hoverPosition}`]
          } ${token ? style.logout : ""}`}
        ></div>
        <Link to="" onMouseEnter={hoverPositionChangeHandler.bind(null, 0)}>
          Strona główna
        </Link>
        <Link
          to="products"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 1)}
        >
          Produkty
        </Link>
        <Link
          to="prices"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 2)}
        >
          Cennik
        </Link>
        <Link
          to="about"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 3)}
        >
          O firmie
        </Link>
        <Link
          to="contact"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 4)}
        >
          Kontakt
        </Link>
        {!token ? (
          <Link
            to="/login"
            onMouseEnter={hoverPositionChangeHandler.bind(null, 5)}
          >
            Logowanie
          </Link>
        ) : (
          <span
            onMouseEnter={hoverPositionChangeHandler.bind(null, 5)}
            onClick={logoutHandler}
          >
            Wyloguj
          </span>
        )}
      </div>
    </nav>
  );
});
