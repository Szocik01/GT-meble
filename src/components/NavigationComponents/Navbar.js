import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { positionActions } from "../../storage/redux";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const positions = useSelector((state) => {
    return state.sidebarPosition;
  });
  const isScrolled = useSelector((state) => {
    return state.navigationColor.isScrolled;
  });

  function hoverPositionChangeHandler(number) {
    dispatch(positionActions.hoverPositionChange(number));
  }

  function onLeavePositionChangeHandler() {
    dispatch(positionActions.onLeavePositionChange());
  }

  function unfoldingHandler()
  {
      props.setIsUnfolded((prevValue)=>{ return !prevValue});
  }

  return (
    <nav className={`${style.navbar} ${isScrolled ? style.scrolled : ""}`}>
        <div className={`${style.hamburger} ${props.isUnfolded ? style.unfolded : ""}`} onClick={unfoldingHandler}></div>
      <div
        className={style.linksContainer}
        onMouseLeave={onLeavePositionChangeHandler}>
        <div
          className={`${style.tagger} ${style[`position${positions.hoverPosition}`]}`}></div>
        <Link to="main" onMouseEnter={hoverPositionChangeHandler.bind(null, 0)}>
          Strona główna
        </Link>
        <Link
          to="products"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 1)}>
          Produkty
        </Link>
        <Link
          to="prices"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 2)}>
          Cennik
        </Link>
        <Link
          to="about"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 3)}>
          O firmie
        </Link>
        <Link
          to="contact"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 4)}>
          Kontakt
        </Link>
      </div>
    </nav>
  );
}
