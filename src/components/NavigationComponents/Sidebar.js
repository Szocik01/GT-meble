import style from "./Sidebar.module.css";
import SingleLink from "./SingleLink";
import { useDispatch, useSelector } from "react-redux";
import { positionActions } from "../../storage/redux";
import { useRef, useEffect, useState } from "react";

export default function Sidebar(props) {
  const [marginValue, setMarginValue] = useState(0);

  const dispatch = useDispatch();
  const sidebarRef = useRef();
  const hoverPosition = useSelector((state) => {
    return state.sidebarPosition.hoverPosition;
  });
  const isScrolled = useSelector((state) => {
    return state.navigationColor.isScrolled;
  });
  const token=useSelector((state)=>{
    return state.loginData.token;
  });

  function hoverPositionChangeHandler(number) {
    dispatch(positionActions.hoverPositionChange(number));
  }

  function onLeavePositionChangeHandler() {
    dispatch(positionActions.onLeavePositionChange());
  }

  const onWindowResizeHandler = (event) => {
    if (event.target.screen.availWidth < 768) {
      setMarginValue(
        sidebarRef.current.children[0].children[
          hoverPosition + 1
        ].getBoundingClientRect().top -
          sidebarRef.current.getBoundingClientRect().top
      );
    }
  };

  // useEffect musi odświerzać się co każde hoverPosition ponieważ komponent navbar jest renderowany
  // na samym początku działania aplikacji. Wtedy domyślna wartość hoverPosition to 0. 
  // Po dodaniu eventListenera wartość ta zostaje używana w funkcji, nawet pomimo zmiany tej wartości.
  // Dlatego eventListener musi być usuwany i dodawany na nowo za każdym razem gdy zmieni się wartość hoverPosition.

  useEffect(() => {
    window.addEventListener("resize", onWindowResizeHandler);

    return () => {
      window.removeEventListener("resize", onWindowResizeHandler);
    };
  }, [hoverPosition]);

  useEffect(() => {
    setMarginValue(
      sidebarRef.current.children[0].children[
        hoverPosition + 1
      ].getBoundingClientRect().top -
        sidebarRef.current.getBoundingClientRect().top
    );
  }, [hoverPosition, sidebarRef, setMarginValue]);

  return (
    <nav
      className={`${style.sidebar} ${props.isUnfolded ? style.unfolded : ""} ${
        isScrolled ? style.scrolled : ""
      }`}
      ref={sidebarRef}
    >
      <div
        className={style.relativeContainer}
        onMouseLeave={onLeavePositionChangeHandler}
      >
        <div
          className={style.tagger}
          style={{ top: `${marginValue.toFixed(2)}px` }}
        ></div>
        <SingleLink
          id={0}
          isActive={hoverPosition === 0}
          hoverPositionChangeHandler={hoverPositionChangeHandler}
          to=""
          linkName="Strona główna"
        />
        <SingleLink
          id={1}
          isActive={hoverPosition === 1}
          hoverPositionChangeHandler={hoverPositionChangeHandler}
          to="products"
          linkName="Produkty"
        />
        <SingleLink
          id={2}
          isActive={hoverPosition === 2}
          hoverPositionChangeHandler={hoverPositionChangeHandler}
          to="prices"
          linkName="Cennik"
        />
        <SingleLink
          id={3}
          isActive={hoverPosition === 3}
          hoverPositionChangeHandler={hoverPositionChangeHandler}
          to="about"
          linkName="O firmie"
        />
        <SingleLink
          id={4}
          isActive={hoverPosition === 4}
          hoverPositionChangeHandler={hoverPositionChangeHandler}
          to="contact"
          linkName="Kontakt"
        />
        <SingleLink
          id={5}
          isActive={hoverPosition === 5}
          hoverPositionChangeHandler={hoverPositionChangeHandler}
          to={token?null:"login"}
          linkName={token?"Wyloguj":"Logowanie"}
          isLogout={!!token}
          logoutHandler={props.logoutHandler}
        />
      </div>
    </nav>
  );
}
