import SpinnerSVG from "../Svgs/Spinner.svg";
import style from "./Spinner.module.css";

export default function Spinner()
{
    return <img alt="Spinner" src={SpinnerSVG} className={style.spinner} />
}