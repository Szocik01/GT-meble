import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./AdminNavigation.module.css";
import { Button } from "@mui/material";
import deleteSingleCookie from "../../utils/DeleteSingleCookie";
import { useDispatch } from "react-redux";
import { loginDataActions } from "../../storage/redux";

export default function AdminNavigation() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  function handleLogout() {
    deleteSingleCookie("token");
    dispatch(loginDataActions.deleteTokenFromRedux());
    navigate('/',{replace:true})
  }

  function handleActiveLinkClass({ isActive, isPending }){
    let className = style.link;
    
    return isActive ? `${className} ${style.active}` : className;
  }

  return (
    <div className={style.container}>
      <NavLink to="/admin/realizations" className={handleActiveLinkClass}>realizacje</NavLink>
      <NavLink to="/admin/add-realization" className={handleActiveLinkClass}>dodaj realizajcę</NavLink>
      <NavLink to="/admin/service" className={handleActiveLinkClass}>usługi</NavLink>
      <Button sx={{marginTop:"auto"}} type="button" variant="contained" onClick={handleLogout}>
        wyloguj
      </Button>
    </div>
  );
}
