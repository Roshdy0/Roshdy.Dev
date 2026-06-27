import Image from "next/image";
import { notFound } from "next/navigation";
import allProducts from "@/app/data/products.json";
import { Product } from "@/app/data/typesProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoriteButton from "@/app/components/Buttons/FavoriteButton/FavoriteButton";
import AddToCartButton from "@/app/components/Buttons/AddToCartButton/AddToCartButtonId";
import { faStar, faTruck, faShieldAlt, faUndo } from "@fortawesome/free-solid-svg-icons";
import RecentViewTracker from "@/app/components/Pages/RecentViewTracker/RecentViewTracker";
import "./productId.css";

export default async function ProductId({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const product = allProducts.find((p: Product) => p.id.toString() === id);

	if (!product) {
		notFound();
	}
	const discountPercentage = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

	return (
		<main className="product-details-page">
			{product && <RecentViewTracker product={product} />}
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					<div className="lg:col-span-5 image-section">
						<div className="main-image-wrapper">
							<Image src={`${product.pathImg}${product.image}`} alt={product.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
							<FavoriteButton product={product} />
						</div>
					</div>

					<div className="lg:col-span-7 info-section">
						<div className="category-badge">{product.categories?.[0] || "Premium Gear"}</div>

						<h1 className="product-title">{product.name}</h1>

						<div className="rating-container">
							<div className="stars-row">
								{[...Array(5)].map((_, i) => (
									<FontAwesomeIcon key={i} icon={faStar} className="star-icon filled" />
								))}
							</div>
							<span className="rating-text">(120 customer reviews)</span>
						</div>

						<hr className="section-divider" />

						<div className="price-container-box">
							<div className="price-row-main">
								<span className="current-price-val">${product.price.toFixed(2)}</span>
								{product.oldPrice && (
									<>
										<span className="old-price-val">${product.oldPrice.toFixed(2)}</span>
										<span className="discount-tag">{discountPercentage}% OFF</span>
									</>
								)}
							</div>
							<p className="tax-note">Prices include VAT</p>
						</div>

						<div className="product-description-block">
							<h2>Specifications and Description:</h2>
							<p>
								{product.description ||
									"This product is precisely designed and manufactured from premium materials to suit the professional working environment for developers and quality seekers, and comes with a certified quality guarantee from our store."}
							</p>
						</div>

						<hr className="section-divider" />

						<div className="purchase-actions">
							<AddToCartButton product={product} />
						</div>

						<div className="trust-signals-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div className="signal-item">
								<FontAwesomeIcon icon={faTruck} />
								<div className="signal-content">
									<h3>Fast & Free Shipping</h3>
									<p>Secure delivery to your doorstep</p>
								</div>
							</div>
							<div className="signal-item">
								<FontAwesomeIcon icon={faShieldAlt} />
								<div className="signal-content">
									<h3>100% Original</h3>
									<p>Trusted and quality-inspected product</p>
								</div>
							</div>
							<div className="signal-item">
								<FontAwesomeIcon icon={faUndo} />
								<div className="signal-content">
									<h3>Easy Returns</h3>
									<p>Flexible 14-day return policy</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
