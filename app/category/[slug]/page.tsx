import Link from "next/link";
import allProducts from "@/app/data/products.json";
import AddToCartButton from "@/app/components/Buttons/AddToCartButton/AddToCartButtonId";
import "./CategoryPage.css";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	if (!slug) return <div className="error-message">No category specified.</div>;

	const decodedSlug = decodeURIComponent(slug).toLowerCase();

	const filteredProducts = allProducts.filter((product) => product.categories?.some((c) => typeof c === "string" && c.toLowerCase().replace(/\s+/g, "-") === decodedSlug));

	if (filteredProducts.length === 0) {
		return (
			<div className="no-products-container">
				<h1>Category Not Found</h1>
				<p>We couldn't find any products in "{decodedSlug.replace(/-/g, " ")}".</p>
				<Link href="/" className="back-home-btn" aria-label="Back to shop">
					Back to Shop
				</Link>
			</div>
		);
	}

	const categoryTitle = decodedSlug.replace(/-/g, " ");

	return (
		<main className="category-page">
			<div className="container">
				<nav className="breadcrumbs" aria-label="Breadcrumb">
					<Link href="/" aria-label="Home">
						Home
					</Link>
					<span className="separator">/</span>
					<span className="current-page">{categoryTitle}</span>
				</nav>

				<h1 className="page-title">{categoryTitle}</h1>

				<section className="products-section">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{filteredProducts.map((product) => (
							<article key={product.id} className="product-card">
								{product.trending && <span className="trending-badge">Trending</span>}

								<div className="product-image-container">
									<img src={`${product.pathImg}${product.image}`} className="object-contain" alt={product.name} width={300} height={200} loading="lazy" />
								</div>

								<div className="product-details">
									<h3 className="product-name">{product.name}</h3>

									<div className="product-price-group">
										<span className="current-price">${product.price}</span>
										{product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
									</div>

									<AddToCartButton product={product as any} />
								</div>
							</article>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
