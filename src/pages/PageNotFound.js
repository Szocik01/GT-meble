import style from "./PageNotFound.module.css";
import SiteTextContainer from "../UI/SiteTextContainer";

export default function PageNotFound() {
  return (
    <SiteTextContainer isOvserving={false}>
      <div className={style.container}>
        <span className={style.number}>404</span>
        <span className={style.text}>PAGE NOT FOUND</span>
      </div>
    </SiteTextContainer>
  );
}
