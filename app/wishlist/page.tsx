"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSearchPlus, faStar } from "@fortawesome/free-solid-svg-icons";

export default function WishlistPage() {
	const [isMounted, setIsMounted] = useState(false);
	const { favorites, toggleFavorite } = useFavoritesStore();
	const addToCart = useCartStore((state) => state.addToCart);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<section className="Wishlist py-10">
			<div className="container mx-auto px-4">
				{favorites.length === 0 ? (
					<div className="text-center py-20">
						<p className="mb-4">Your wishlist is currently empty.</p>
						<Link href="/" className="text-(--primary) font-bold hover:underline" aria-label="Continue Shopping">
							Continue Shopping
						</Link>
					</div>
				) : (
					<div className="try">
						<div className="section-title">
							<h2>
								My <span>Favorites</span>
							</h2>
							<p>Keep track of your favorite products.</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
							{favorites.map((product) => (
								<div key={product.id} className="product-card">
									<div className="image-container">
										<Image
											src={`${product.pathImg}${product.image}`}
											alt={product.name}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
										/>
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
										<button onClick={() => toggleFavorite(product)} className="action-btn favorite-btn active" aria-label={`Remove ${product.name} from favorites`}>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
