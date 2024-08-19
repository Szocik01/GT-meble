import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import style from "./Contact.module.css";
import Map from "../components/ContactComponents/Map";
import ContactInfo from "../components/ContactComponents/ContactInfo";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SingleColumn from "../UI/Layouts/SingleColumn";
import { Instagram } from "@mui/icons-material";

export default function Contact() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(4));
  }, [dispatch]);

  return (
    <>
      <SingleColumn title={"Skontaktuj się z nami"} marginBottom={true}>
        <div className={style.contactInfoContainer}>
          <ContactInfo icon={<FacebookIcon fontSize="large" />}>
            <a className={style.link} href="#">
              <span className={style.data}>facebook.com/GT-Meble</span>
            </a>
          </ContactInfo>
          <ContactInfo icon={<Instagram fontSize="large" />}>
            <a href="#" className={style.link}>
              <span className={style.data}>instagram.com/GT-meble</span>
            </a>
          </ContactInfo>
          <ContactInfo icon={<LocalPhoneIcon fontSize="large" />}>
            <span className={style.data}>+48 123456789</span>
          </ContactInfo>
          <ContactInfo icon={<EmailIcon fontSize="large" />}>
            <span className={style.data}> mail</span>
          </ContactInfo>
          <ContactInfo icon={<PlaceIcon fontSize="large" />}>
            <span className={style.data}>ul.Kościelecka 2, Pawłowice, 32-480</span>
          </ContactInfo>

        </div>
        <Map />
      </SingleColumn>
    </>
  );
}
