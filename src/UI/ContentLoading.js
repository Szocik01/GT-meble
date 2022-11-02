import style from "./ContentLoading.module.css";
import { CircularProgress } from "@mui/material";

export default function ContentLoading() {
  return (
    <div className={style.loading}>
      <CircularProgress sx={{ color: "black" }} />
    </div>
  );
}
