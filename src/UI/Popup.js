import style from "./Popup.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popUpInfoActions } from "../storage/redux";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { disappearTimeMs } = props;

  const dispatch = useDispatch();

  const popUpState = useSelector((state) => {
    return state.popUpInfo;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(popUpInfoActions.removeMessage());
    }, disappearTimeMs);

    return () => {
      clearTimeout(timer);
    };
  }, [disappearTimeMs, dispatch]);

  function closePopUpHandler() {
    dispatch(popUpInfoActions.removeMessage());
  }

  return createPortal(
    <aside
      className={`${style.container} ${popUpState.isError ? style.error : ""}`}
    >
      <span className={style.info}>{popUpState.message}</span>
      <div className={style.iconContainer} onClick={closePopUpHandler} >
        <CloseIcon sx={{ height: "100%" }}/>
      </div>
    </aside>,
    document.getElementById("popUp")
  );
}
