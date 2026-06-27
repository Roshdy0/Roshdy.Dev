import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/data/typesProducts";

interface RecentViewedStore {
	recentProducts: Product[];
	addToRecent: (product: Product) => void;
}

export const useRecentViewedStore = create<RecentViewedStore>()(
	persist(
		(set) => ({
			recentProducts: [],
			addToRecent: (product) =>
				set((state) => {
					const filtered = state.recentProducts.filter((p) => p.id !== product.id);
					const newRecent = [product, ...filtered].slice(0, 5);
					return { recentProducts: newRecent };
				}),
		}),
		{ name: "recent-viewed-storage" }
	)
);
