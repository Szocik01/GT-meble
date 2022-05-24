import { Fragment, useEffect } from "react"
import style from "./Main.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import { Link } from "react-router-dom";
import SiteTextContainer from "../UI/SiteTextContainer";
import ScrollUpSVG from "../Svgs/ScrollUp.svg";

export default function Main()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(0))
    },[dispatch]);


    return <Fragment>
        <SiteTextContainer isObserving={true}>
            <h2 className={style.mainHeader}>Najlepsze ryby jakie możesz kupić!</h2>
            <p className={style.text}>Nasze ryby, hodowane na naturalnych paszach i zbożach, dają gwarancję naturalengo smaku, który wszyscy uwielbiamy. Duży wybór ryb jaki oferujemy daje Ci pewność, że dostaniesz u nas dokładnie to co lubisz. Nasze ryby nie przyjmują antybiotyków, co dodatkowo podnosi ich walory smakowe i zdrowotne. Sprawdź naszą ofertę i wybierz to co lubisz najbardziej!</p>
            <div className={style.linkContainer}>
                <Link to="/products" className={style.link}>Sprawdź ofertę <img alt="Strzałka" src={ScrollUpSVG}/></Link>
            </div>
            <h2 className={style.mainHeader}>Świetne ryby w dobrych cenach!</h2>
            <p className={style.text}>Skosztuj ekologicznych i naturalnie hodowanych ryb w cenach na Twoją kieszeń. Przekonaj się sam, że aby dostać najwyższej jakości rybę, nie trzeba wydawać wielu pieniędzy.</p>
            <div className={style.linkContainer}>
                <Link to="/prices" className={style.link}>Sprawdź ceny<img alt="Strzałka" src={ScrollUpSVG}/></Link>
            </div>
            <h2 className={style.mainHeader}>Skontaktujmy się!</h2>
            <p className={style.text}>Skontaktuj się z nami już dziś. Jeśli nie wiesz co wybrać to z chęcią pomożemy Ci wybrać rybę odpowiednią do twoich wymagań. Jeśli jednak wiesz już czego potrzebujesz, nie ma co zwlekać. Zadzwoń, a wspólnie ustalimy wszystkie szczegóły Twojego zamówienia.</p>
            <div className={style.linkContainer}>
                <Link to="/contact" className={style.link}>Dane kontaktowe<img alt="Strzałka" src={ScrollUpSVG}/></Link>
            </div>
        </SiteTextContainer>
    </Fragment>
}