import React from "react";
import style from "./SingleProduct.module.css";
import { Link } from "react-router-dom";
import RealizationAdminButtons from "../AdminComponents/RealizationsComponents/RealizationAdminButtons";
import ContentLoading from "../../UI/ContentLoading";
import { API_CALL_URL_BASE } from "../../utils/Constants";

export default React.memo(function SingleProduct(props) {
  const {
    id,
    images,
    title,
    category,
    adminMode,
    onDeleteRealization,
    isDeleting,
    description,
  } = props;

  return (
    <section className={`${style.cardContainer} ${style.disableScaling}`}>
      {isDeleting ? <ContentLoading coverParent={true} /> : ""}
      <div className={style.card}>
        {adminMode ? (
          <RealizationAdminButtons
            realizationId={id}
            onDeleteRealization={onDeleteRealization}
          />
        ) : (
          ""
        )}
        <Link to={`/realization/${id}`} className={style.link}></Link>
        <div className={style.imageContainer}>
          <div
            className={style.imagePreview}
            style={{
              backgroundImage: `url(${API_CALL_URL_BASE}/${
                images[0].path.split(".")[0]
              }-preview.${images[0].path.split(".")[1]})`,
            }}
          ></div>
          <img
            key={images[0].id}
            alt={images[0].id}
            src={`${API_CALL_URL_BASE}/${images[0].path.split(".")[0]}-lg.${
              images[0].path.split(".")[1]
            }`}
            onLoad={(event)=>{
              event.target.style.opacity = 1;
            }}
          />
        </div>
        <div className={style.body}>
          <h3 className={`${style.itemsHeader} ${style.padding}`}>{title}</h3>
          <span className={style.category}>Kategoria: {category}</span>
          <span
            className={style.text}
            dangerouslySetInnerHTML={{ __html: description }}
          ></span>
        </div>
      </div>
    </section>
  );
});
