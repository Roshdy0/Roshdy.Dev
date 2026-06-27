"use client";
import Link from "next/link";
import Image from "next/image";
import { heroSlides } from "@/app/data/heroData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import "./Hero.css";

const Hero = () => {
	return (
		<section className="hero-section">
			<Swiper
				spaceBetween={0}
				centeredSlides={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
					dynamicBullets: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="hero-swiper"
			>
				{heroSlides.map((slide, index) => (
					<SwiperSlide key={slide.id}>
						<div className="slide-container">
							<div className="slide-image-wrapper">
								<Image src={slide.image} alt={slide.title} fill priority={index === 0} quality={85} className="object-contain hero-bg-img" />
								<div className="slide-overlay"></div>
							</div>

							<div className="container mx-auto">
								<div className="slide-content">
									<span className="slide-badge">{slide.badge}</span>
									<h1 className="slide-title">{slide.title}</h1>
									<p className="slide-subtitle">{slide.subtitle}</p>
									<div className="slide-actions">
										<Link href={slide.link} className="hero-btn" aria-label={slide.btnText}>
											{slide.btnText}
										</Link>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Hero;
