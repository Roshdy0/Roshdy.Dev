"use client";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@/app/data/typesProducts";
import { useCartStore } from "@/app/store/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { faSearchPlus, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductPage = ({ products }: { products: Product[] }) => {
	const [isMounted, setIsMounted] = useState(false);
	const { favorites, toggleFavorite } = useFavoritesStore();
	const addToCart = useCartStore((state) => state.addToCart);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<section className="product-page bg-(--background) px-0 py-16;">
			<div className="container mx-auto px-4">
				<div className="section-title">
					<h2>
						Our <span className="text-primary">Products</span>
					</h2>
					<p>Discover our handpicked premium collection</p>
				</div>

				<Swiper
					spaceBetween={30}
					slidesPerView={1}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					loop={true}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 4 },
					}}
				>
					{products.map((product) => {
						const isFav = isMounted && favorites.some((item) => item.id === product.id);

						return (
							<SwiperSlide key={product.id}>
								<div className="product-card">
									<div className="image-container">
										<Image
											src={`${product.pathImg}${product.image}`}
											alt={product.name}
											fill
											className="p-4 object-contain"
											sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
										/>
									</div>

									<div className="product-info">
										<div className="price-row">
											<span className="current-price">${product.price.toFixed(2)}</span>
											<span className="old-price">${product.oldPrice.toFixed(2)}</span>
										</div>
										<div className="rating">
											{[...Array(5)].map((_, i) => (
												<FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
											))}
										</div>
									</div>

									<div className="card-actions">
										<Link href={`/product/${product.id}`} className="action-btn" aria-label={`View details for ${product.name}`}>
											<FontAwesomeIcon icon={faSearchPlus} />
										</Link>
										<button
											onClick={(e) => {
												addToCart(product);
												const btn = e.currentTarget;
												btn.classList.add("added-animation");
												setTimeout(() => btn.classList.remove("added-animation"), 1000);
											}}
											className="action-btn add-to-cart"
											aria-label={`Add ${product.name} to cart`}
										>
											Add to Cart
										</button>

										<button
											onClick={(e) => {
												toggleFavorite(product);
												const btn = e.currentTarget;
												btn.classList.add("heart-pop");
												setTimeout(() => btn.classList.remove("heart-pop"), 400);
											}}
											className={`action-btn favorite-btn ${isFav ? "active" : ""}`}
											aria-label={`Toggle favorite for ${product.name}`}
										>
											<FontAwesomeIcon icon={faHeart} />
										</button>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>

				<Link href="/shop" className="Button-Shop" aria-label="View all products">
					View All Products
				</Link>
			</div>
		</section>
	);
};

export default ProductPage;
