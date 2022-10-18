import { Link } from "react-router-dom";
import style from "./SingleLink.module.css";

export default function SingleLink(props) {
  const { id, isActive, to, linkName, isLogout, logoutHandler } = props;

  function onMouseEnterHandler() {
    props.hoverPositionChangeHandler(id);
  }

  return !isLogout ? (
    <Link
      className={`${style.link} ${isActive ? style.active : ""}`}
      to={to}
      onMouseEnter={onMouseEnterHandler}
    >
      {linkName}
    </Link>
  ) : (
    <div
      className={`${style.link} ${isActive ? style.active : ""}`}
      onMouseEnter={onMouseEnterHandler}
      onClick={logoutHandler}
    >{linkName}</div>
  );
}
