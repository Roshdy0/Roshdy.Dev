"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/data/typesProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import FavoriteButton from "@/app/components/Buttons/FavoriteButton/FavoriteButton";
import AddToCartButton from "@/app/components/Buttons/AddToCartButton/AddToCartButton";

interface Props {
	product: Product;
	priority?: boolean;
}

export default function ProductCard({ product, priority }: Props) {
	return (
		<div className="product-card">
			<div className="image-container">
				<Image
					src={`${product.pathImg}${product.image}`}
					alt={product.name}
					fill
					className="object-contain p-4"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority={priority}
				/>
			</div>

			<div className="product-info">
				<div className="price-row">
					<span className="current-price">${product.price.toFixed(2)}</span>
					<span className="old-price">${product.oldPrice.toFixed(2)}</span>
				</div>
				<div className="rating">
					{[...Array(5)].map((_, i) => (
						<FontAwesomeIcon key={i} icon={faStar} className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
					))}
				</div>
			</div>

			<div className="card-actions">
				<Link href={`/product/${product.id}`} className="action-btn" aria-label={`View details for ${product.name}`}>
					<FontAwesomeIcon icon={faSearchPlus} />
				</Link>
				<AddToCartButton product={product} />
				<FavoriteButton product={product} />
			</div>
		</div>
	);
}
