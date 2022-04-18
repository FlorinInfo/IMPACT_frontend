import "./MediaSliderStyles.scss"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MediaSlider = ({media}) => {

	return (
		<div className="slider">
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{
					media.map((m)=> 
						<SwiperSlide className="slider__media-cnt"><img className="slider__media" src={m} alt="" /></SwiperSlide>
					)
				}
				{/* <SwiperSlide className="slider__media-cnt"><img className="slider__media" src={media[1]} alt="" /></SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide> */}
			</Swiper>
		</div>
	)
}

export default MediaSlider;