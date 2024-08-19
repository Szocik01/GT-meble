import style from "./ContentLoading.module.css";
import { CircularProgress } from "@mui/material";

export default function ContentLoading(props) {
  const {coverParent} = props;
  return (
    <div className={`${style.loading} ${coverParent ? style.blurOverlay : ""}`}>
      <CircularProgress sx={{ color: "black" }} />
    </div>
  );
}
