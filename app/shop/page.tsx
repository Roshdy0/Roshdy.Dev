import { Product } from "@/app/data/typesProducts";
import allProducts from "@/app/data/products.json";
import ProductCard from "@/app/components/Pages/productPage/ProductCard";
import FilterSidebar from "@/app/components/Pages/productPage/FilterSidebar/FilterSidebar";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
	const params = await searchParams;
	let filteredProducts = allProducts as Product[];

	const categoriesMap: Record<string, number> = {};
	allProducts.forEach((product: any) => {
		product.categories.forEach((cat: string) => {
			categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
		});
	});

	const categoryList = Object.entries(categoriesMap).map(([name, count]) => ({
		name,
		count,
	}));

	if (params.category) {
		filteredProducts = filteredProducts.filter((p) => p.categories.includes(params.category as string));
	}

	if (params.sort === "price-low") filteredProducts.sort((a, b) => a.price - b.price);
	if (params.sort === "price-high") filteredProducts.sort((a, b) => b.price - a.price);
	if (params.maxPrice) {
		const maxPriceValue = parseInt(params.maxPrice);
		filteredProducts = filteredProducts.filter((p) => p.price <= maxPriceValue);
	}

	if (params.rating) {
		const ratingValue = parseInt(params.rating as string);
		if (!isNaN(ratingValue)) {
			filteredProducts = filteredProducts.filter((p) => p.rating >= ratingValue);
		}
	}

	return (
		<div className="flex">
			<FilterSidebar categories={categoryList} />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{filteredProducts.map((product, index) => (
					<ProductCard key={product.id} product={product} priority={index < 2} />
				))}
			</div>
		</div>
	);
}
