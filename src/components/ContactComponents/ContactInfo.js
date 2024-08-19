import style from "./ContactInfo.module.css";
export default function ContactInfo(props) {
  return (
    <div className={style.container}>
      {props.icon}
      {props.children}
    </div>
  );
}
