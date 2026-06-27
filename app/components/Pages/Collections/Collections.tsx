"use client";

import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import allProducts from "@/app/data/products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faGamepad, faKeyboard, faMouse, faTv, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "./Collections.css";
import "swiper/css/navigation";

const categoryIcons: { [key: string]: any } = {
	Monitors: faTv,
	Gaming: faGamepad,
	Accessories: faMouse,
	Keyboards: faKeyboard,
	Electronics: faDesktop,
};

const Collections = () => {
	const categories = Array.from(new Set(allProducts.flatMap((p) => p.categories || [])));

	return (
		<section className="collections-section">
			<div className="container">
				<div className="section-title">
					<h2>
						Shop by <span className="text-primary">Categories</span>{" "}
					</h2>
				</div>

				<Swiper
					spaceBetween={20}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					navigation={true}
					modules={[Autoplay]}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 4 },
					}}
				>
					{categories.map((category) => (
						<SwiperSlide key={category}>
							<Link href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`} className="category-card" aria-label={`View ${category} products`}>
								<div className="icon-wrapper">
									<FontAwesomeIcon icon={categoryIcons[category] || faBoxOpen} />
								</div>
								<span className="category-name">{category}</span>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Collections;
