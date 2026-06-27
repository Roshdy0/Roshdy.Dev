"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/data/typesProducts";

interface FavoritesState {
	favorites: Product[];
	toggleFavorite: (product: Product) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			toggleFavorite: (product) => {
				const currentFavorites = get().favorites;
				const isExist = currentFavorites.some((item) => item.id === product.id);

				if (isExist) {
					set({ favorites: currentFavorites.filter((item) => item.id !== product.id) });
				} else {
					set({ favorites: [...currentFavorites, product] });
				}
			},
		}),
		{
			name: "wishlist-storage",
		}
	)
);
