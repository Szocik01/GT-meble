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
          <ContactInfo icon={<Instagram fontSize="large" />}>
            <a href="https://www.instagram.com/grzegorz.tetla.meble/" className={style.link}>
              <span className={style.data}>grzegorz.tetla.meble</span>
            </a>
          </ContactInfo>
          <ContactInfo icon={<LocalPhoneIcon fontSize="large" />}>
            <span className={style.data}><a href="tel:793687118">+48 793 687 118</a></span>
          </ContactInfo>
          <ContactInfo icon={<EmailIcon fontSize="large" />}>
            <span className={style.data}> <a href="mailto:gteq775@gmail.com">gteq775@gmail.com</a></span>
          </ContactInfo>
          <ContactInfo icon={<PlaceIcon fontSize="large" />}>
            <span className={style.data}>ul. Akacjowa 12, Zebrzydowice, 43-410</span>
          </ContactInfo>

        </div>
        <Map />
      </SingleColumn>
    </>
  );
}
