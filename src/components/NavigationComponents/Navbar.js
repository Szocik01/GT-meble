import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { positionActions } from "../../storage/redux";
import { useDispatch, useSelector } from "react-redux";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default React.memo(function Navbar(props) {
  const { isUnfolded, setIsUnfolded } = props;

  const [taggerPosition, setTaggerPosition] = useState({
    marginLeft: 0,
    width: 0,
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const dispatch = useDispatch();

  const navbarLinksContainerRef = useRef();
  const taggerRef = useRef();

  const hoverPosition = useSelector((state) => {
    return state.sidebarPosition.hoverPosition;
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

  function unfoldingHandler() {
    setIsUnfolded((prevValue) => {
      return !prevValue;
    });
  }
  const calculateTaggerPosition = useCallback(() => {
    const marginLeft =
      navbarLinksContainerRef.current.children[
        hoverPosition
      ].getBoundingClientRect().left -
      navbarLinksContainerRef.current.getBoundingClientRect().left;
    const width =
      navbarLinksContainerRef.current.children[
        hoverPosition
      ].getBoundingClientRect().width;
    return { marginLeft: marginLeft, width: width };
  }, [hoverPosition, navbarLinksContainerRef]);

  useEffect(() => {
    let timer;
    if(isFirstLoad){
      timer = setTimeout(() => {
        setIsFirstLoad(false)
      }, 10);
      return ()=>{
        clearTimeout(timer);
      }
    }
    setTaggerPosition(calculateTaggerPosition());
  }, [calculateTaggerPosition,isFirstLoad]);


  return (
    <nav className={`${style.navbar} ${isScrolled ? style.scrolled : ""}`}>
      <div
        className={`${style.hamburger} ${isUnfolded ? style.unfolded : ""}`}
        onClick={unfoldingHandler}
      ></div>
      <Link to="" className={style.logo}>GT Meble</Link>
      <div
        className={style.linksContainer}
        onMouseLeave={onLeavePositionChangeHandler}
        ref={navbarLinksContainerRef}
      >
        <div
          className={style.tagger}
          ref={taggerRef}
          style={{
            marginLeft: `${taggerPosition.marginLeft.toFixed(2)}px`,
            width: `${taggerPosition.width.toFixed(2)}px`,
          }}
        ></div>
        <Link to="" onMouseEnter={hoverPositionChangeHandler.bind(null, 1)}>
          Strona główna
        </Link>
        <Link
          to="realizations"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 2)}
        >
          Realizacje
        </Link>
        <Link
          to="services"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 3)}
        >
          O usługach
        </Link>
        <Link
          to="contact"
          onMouseEnter={hoverPositionChangeHandler.bind(null, 4)}
        >
          Kontakt
        </Link>
      </div>
    </nav>
  );
});
