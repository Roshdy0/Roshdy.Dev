import Link from "next/link";
import Image from "next/image";
import { heroSlides } from "@/app/data/heroData";
import allProducts from "@/app/data/products.json";
import { Product } from "@/app/data/typesProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import FavoriteButton from "@/app/components/Buttons/FavoriteButton/FavoriteButton";
import AddToCartButton from "@/app/components/Buttons/AddToCartButton/AddToCartButton";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const filteredProducts = allProducts.filter((p) => p.categories && p.categories.includes(slug));

	const currentSlide = heroSlides.find((slide) => slide.link.includes(slug));
	const displayTitle = currentSlide ? currentSlide.title : decodeURIComponent(slug).toUpperCase();

	return (
		<main className="page-container">
			<div className="container mx-auto py-10 px-7.5 ">
				<div className="section-title">
					<h2>
						<span>{displayTitle}</span>
					</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product: Product) => (
							<div key={product.id} className="product-card">
								<div className="image-container">
									<Image
										src={`${product.pathImg}${product.image}`}
										alt={product.name}
										fill
										className="object-contain p-4"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										priority={false}
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
									<Link href={`/product/${product.id}`} className="action-btn added-animation" aria-label="View product details">
										<FontAwesomeIcon icon={faSearchPlus} />
									</Link>

									<AddToCartButton product={product} />

									<FavoriteButton product={product} />
								</div>
							</div>
						))
					) : (
						<p style={{ textAlign: "center", marginTop: "20px" }}>There are currently no products available for this season.</p>
					)}
				</div>
			</div>
		</main>
	);
}
