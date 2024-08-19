import style from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <>
      <div className={style.container}>
        <span className={style.number}>404</span>
        <span className={style.text}>PAGE NOT FOUND</span>
      </div>
    </>
  );
}
