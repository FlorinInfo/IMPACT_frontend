import "./MediaSliderStyles.scss"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { nanoid } from "nanoid";
import { useRef } from "react";
import Image from 'mui-image'

const MediaSlider = ({ media }) => {
	const videoRef = useRef();
	return (
		<div className="slider">
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{
					media.map((m, index) =>
						<SwiperSlide key={index} className="slider__media-cnt">
							{
								m.type == "image" ? <img className="slider__media-image" src={m.url} alt="" /> :
									<video key={index} width="320" height="240" controls className="slider__media-video">
										<source src={m.url} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
							}
						</SwiperSlide>
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