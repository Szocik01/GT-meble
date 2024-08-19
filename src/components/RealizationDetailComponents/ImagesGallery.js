import style from "./ImagesGallery.module.css";
import { API_CALL_URL_BASE } from "../../utils/Constants";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

export default function ImagesGallery(props) {
  const [lightboxState, setLightboxState] = useState({
    visible: false,
    slideIndex: 0,
  });

  const { images } = props;

  function openLightboxHandler(event) {
    setLightboxState((prevValue) => {
      return {
        visible: !prevValue.visible,
        slideIndex: +event.currentTarget.dataset.index,
      };
    });
  }

  return !images || images.length === 0 ? null : (
    <>
      <h3 className={style.title}>Galeria</h3>
      <div className={style.container}>
        {images.map((image, index) => {
          return (
            <div
              className={style.boxShadowContainer}
              key={image.id}
              data-index={index}
              onClick={openLightboxHandler}
            >
              <div className={style.imageContainer}>
                <div
                  className={style.imagePreview}
                  style={{
                    backgroundImage: `url("${API_CALL_URL_BASE}/${
                      image.path.split(".")[0]
                    }-preview.${image.path.split(".")[1]}")`,
                  }}
                ></div>
                <img
                  className={style.image}
                  alt=""
                  src={`${API_CALL_URL_BASE}/${image.path.split(".")[0]}-sm.${
                    image.path.split(".")[1]
                  }`}
                  onLoad={(event) => {
                    event.target.style.opacity = 1;
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <FsLightbox
        toggler={lightboxState.visible}
        sourceIndex={lightboxState.slideIndex}
        sources={images.map((image) => {
          return `${API_CALL_URL_BASE}/${image.path}`;
        })}
      />
    </>
  );
}
