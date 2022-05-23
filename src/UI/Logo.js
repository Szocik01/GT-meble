import style from "./Logo.module.css"
import LogoSVG from "../Svgs/Logo.svg";

export default function Logo()
{
    return <div className={style.logoContainer}>
        <span className={style.logoText}>Gecho</span>
        <img alt="Logo" src={LogoSVG} className={style.logoImage}/>
    </div>
    
}