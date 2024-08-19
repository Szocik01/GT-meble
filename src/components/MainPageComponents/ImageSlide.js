import style from "./ImageSlide.module.css";

export default function ImageSlide(props) {
  const { image } = props;
  return (

    <div role="img"
      className={style.backgroundImage}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
}
