import { Link } from "react-router-dom";
import style from "./DetailHeader.module.css";
import { ChevronLeft } from "@mui/icons-material";

export default function DetailHeader(props) {
  const { title, subtitle } = props;

  return (
    <div className={style.container}>
      <Link to="/realizations" className={style.backLink}>
        <ChevronLeft /> Wróć do realizacji
      </Link>
      <span className={style.subtitle}>{subtitle}</span>
      <h1 className={style.header}>{title}</h1>
    </div>
  );
}
