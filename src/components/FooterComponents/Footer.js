import { Link, Outlet } from "react-router-dom";
import style from "./Footer.module.css";
import SingleColumn from "../../UI/Layouts/SingleColumn";

export default function Footer() {
  return (
    <>
      <Outlet />
      <footer className={style.footer}>
        <SingleColumn htmlOptions={{ style: { paddingBottom: "0px" } }} withoutMinHeight={true}>
          <div className={style.footerColumn}>
          <Link to="/"><h2 className={style.logo}>GT Meble</h2></Link>
            <ul className={style.dataList}>
              <li>ul. Akacjowa 12</li>
              <li>43-410 Zebrzydowice</li>
              <li><a href="tel:793687118">tel. +48 793 687 118</a></li>
              <li>email: <a href="mailto:gteq775@gmail.com">gteq775@gmail.com</a></li>
            </ul>
          </div>
          <div className={style.footerColumn}>
            <h2 className={style.websiteMap}>Mapa strony</h2>
            <div className={style.dataList}>
              <Link to="/">Strona główna</Link>
              <Link to="/realizations">Realizacje</Link>
              <Link to="/services">O usługach</Link>
              <Link to="/contact">Kontakt</Link>
              <Link to="/login">Zaloguj</Link>
            </div>
          </div>
        </SingleColumn>
      </footer>
    </>
  );
}
