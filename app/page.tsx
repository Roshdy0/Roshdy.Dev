// @/app/page.tsx
import dynamic from "next/dynamic";
import allProducts from "./data/products.json";
import Hero from "./components/Pages/Hero/Hero";

const Collections = dynamic(() => import("./components/Pages/Collections/Collections"), {
	loading: () => <div className="skeleton-loader" />,
	ssr: true,
});

const RecentViewedSection = dynamic(() => import("./components/Pages/RecentViewTracker/RecentViewedSection"), {
	loading: () => <div className="skeleton-loader" />,
	ssr: true,
});

const BestSellers = dynamic(() => import("./components/Pages/bestSellers/bestSellers"), {
	loading: () => <div className="skeleton-loader" />,
	ssr: true,
});

const ProductPage = dynamic(() => import("./components/Pages/productPage/productPage"), {
	loading: () => <div className="skeleton-loader" />,
	ssr: true,
});

const Features = dynamic(() => import("./components/Pages/Features/Features"), {
	loading: () => <div className="skeleton-loader" />,
	ssr: true,
});

export default function Home() {
	const trendingProducts = allProducts.filter((product) => product.trending);

	return (
		<div>
			<main>
				<Hero />
				<Collections />
				<RecentViewedSection />
				<BestSellers products={trendingProducts} />
				<ProductPage products={allProducts} />
				<Features />
			</main>
		</div>
	);
}
