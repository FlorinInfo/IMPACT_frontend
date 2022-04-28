import "./MediaSliderStyles.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { GrNext, GrPrevious } from "react-icons/gr";

const MediaSlider = ({ media }) => {
  SwiperCore.use([Navigation]);
  const swiper = useSwiper();
  const videoRef = useRef();
  const [activeSlide, setActiveSlider] = useState(1);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <div className="slider">
      {media.length > 1 ? (
        <>
          <div className="slider__counter">
            {activeSlide} / {media.length}
          </div>
          <button
            ref={navigationNextRef}
            className={`${activeSlide==media.length ? "slider__btn--invisible" : ""} slider__btn slider__btn--next`}
          >
            <GrNext color="#878a8c" className="slider__btn-icon" />
          </button>
          <button
            ref={navigationPrevRef}
            className={`${activeSlide==1 ? "slider__btn--invisible" : ""} slider__btn slider__btn--prev`}
          >
            <GrPrevious color="#878a8c" className="slider__btn-icon" />
          </button>
        </>
      ) : (
        ""
      )}
      <Swiper
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveSlider(swiper.activeIndex + 1)}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {media.map((m, index) => (
          <SwiperSlide key={index} className="slider__media-cnt">
            {m.type == "image" ? (
              <img className="slider__media-image" src={m.url} alt="" />
            ) : (
              <video
                key={index}
                width="320"
                height="240"
                controls
                className="slider__media-video"
              >
                <source src={m.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </SwiperSlide>
        ))}
        {/* <SwiperSlide className="slider__media-cnt"><img className="slider__media" src={media[1]} alt="" /></SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default MediaSlider;
