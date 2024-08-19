import { useEffect } from "react";
import style from "./Main.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import ImageSlide from "../components/MainPageComponents/ImageSlide";
import "swiper/css";
import "swiper/css/effect-fade";
import image1 from "../images/MainPageSlider/IMG-20230107-WA0000.jpg";
import image2 from "../images/MainPageSlider/IMG-20230107-WA0003.jpg";
import image3 from "../images/MainPageSlider/IMG-20230107-WA0012.jpg";
import image4 from "../images/MainPageSlider/IMG-20230107-WA0014.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MainLink from "../components/MainPageComponents/MainLink";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(0));
  }, [dispatch]);

  return (
  <div className={style.container}>
      <Swiper
        spaceBetween={0}
        modules={[EffectFade, Autoplay]}
        effect="fade"
        speed={5500}
        autoplay={{
          stopOnLastSlide: false,
          delay: 2500,
         }}
        loop={true}
      >
        <SwiperSlide>
          <ImageSlide image={image1} />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSlide image={image2} />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSlide image={image3} />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSlide image={image4} />
        </SwiperSlide>
      </Swiper>
      <span className={style.logo}>
        GT MEBLE
      </span>
      <div className={style.linkContainer}>
        <MainLink url="/realizations">
          Realizacje
          <ArrowForwardIosIcon />
        </MainLink>
        <MainLink url="/services">
          O usługach
          <ArrowForwardIosIcon />
        </MainLink>
        <MainLink url="/contact">
          Kontakt
          <ArrowForwardIosIcon />
        </MainLink>
      </div>
    </div>
  );
}
