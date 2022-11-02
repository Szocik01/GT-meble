import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import style from "./Contact.module.css";
import contactInfoGridStyle from "../components/ContactComponents/ContactInfo.module.css";
import mapGridStyle from "../components/ContactComponents/Map.module.css";
import SiteTextContainer from "../UI/SiteTextContainer";
import Map from "../components/ContactComponents/Map";
import ContactInfo from "../components/ContactComponents/ContactInfo";
import FbSVG from "../Svgs/Facebook.svg";
import PhoneSVG from "../Svgs/Phone.svg";
import PinSVG from "../Svgs/Pin.svg";

export default function Contact() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(4));
  }, [dispatch]);

  return (
    <Fragment>
      <SiteTextContainer isObserving={false}>
        <div className={style.container}>
          <h2 className={style.header}>SKONTAKTUJ SIĘ Z NAMI</h2>
          <ContactInfo
            alt="Facebook"
            src={FbSVG}
            gridClass={contactInfoGridStyle.item1}
          >
            <a href="#">
              <p>facebook.com/Gecho</p>
            </a>
          </ContactInfo>
          <ContactInfo
            alt="Phone"
            src={PhoneSVG}
            gridClass={contactInfoGridStyle.item2}
          >
            <p>+48 123456789</p>
          </ContactInfo>
          <ContactInfo
            alt="Pin"
            src={PinSVG}
            gridClass={contactInfoGridStyle.item3}
          >
            <p>
              ul.Kościelecka 2<br />
              Pawłowice, 32-480
            </p>
          </ContactInfo>
          <Map gridClass={mapGridStyle.map} />
        </div>
      </SiteTextContainer>
    </Fragment>
  );
}
