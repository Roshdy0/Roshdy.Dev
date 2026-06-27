"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useRecentViewedStore } from "@/app/store/useRecentViewedStore";
import { faSearchPlus, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function RecentViewedSection() {
	const { recentProducts } = useRecentViewedStore();
	const [isMounted, setIsMounted] = useState(false);
	const { favorites, toggleFavorite } = useFavoritesStore();
	const addToCart = useCartStore((state) => state.addToCart);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || recentProducts.length === 0) return null;

	return (
		<section className="recent-viewed-section py-10">
			<div className="section-title">
				<h2>
					Our <span className="text-primary">Recently Viewed</span>
				</h2>
				<p>Your favorite products are still waiting for you, don't miss out!</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
				{recentProducts.map((product) => (
					<div key={product.id} className="product-card">
						<div className="image-container">
							<Image src={`${product.pathImg}${product.image}`} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
						</div>

						<div className="product-info p-4">
							<h3 className="font-bold mb-2">{product.name}</h3>
							<div className="price-row">
								<span className="current-price">${product.price.toFixed(2)}</span>
								{product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
							</div>
							<div className="rating">
								{[...Array(5)].map((_, i) => (
									<FontAwesomeIcon key={i} icon={faStar} />
								))}
							</div>
						</div>

						<div className="card-actions">
							<Link href={`/product/${product.id}`} className="action-btn" aria-label={`View details of ${product.name}`}>
								<FontAwesomeIcon icon={faSearchPlus} />
							</Link>
							<button onClick={() => addToCart(product)} className="action-btn add-to-cart" aria-label={`Add ${product.name} to cart`}>
								Add to Cart
							</button>
							<button
								onClick={(e) => {
									toggleFavorite(product);
									const btn = e.currentTarget;
									btn.classList.add("heart-pop");
									setTimeout(() => btn.classList.remove("heart-pop"), 400);
								}}
								className={`action-btn favorite-btn ${isMounted && favorites.some((item) => item.id === product.id) ? "active" : ""}`}
								aria-label={`Toggle favorite for ${product.name}`}
							>
								<FontAwesomeIcon icon={faHeart} />
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
