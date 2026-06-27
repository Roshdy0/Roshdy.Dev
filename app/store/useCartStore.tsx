// create store from Library
import { create } from "zustand";
// persist middleware to save data in cart auto
import { persist } from "zustand/middleware";

interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
	pathImg: string;
}

interface CartState {
	items: CartItem[];
	clearCart: () => void;
	addToCart: (product: any) => void;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
}

// To Save Data In LocalStorage
export const useCartStore = create<CartState>()(
	persist(
		//For Update Data
		(set) => ({
			items: [],

			addToCart: (product) =>
				set((state) => {
					const exists = state.items.find((item) => item.id === product.id);
					if (exists) {
						return {
							items: state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
						};
					}
					return { items: [...state.items, { ...product, quantity: 1 }] };
				}),

			increaseQuantity: (id) =>
				set((state) => {
					return {
						items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
					};
				}),

			decreaseQuantity: (id) =>
				set((state) => ({
					items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item)),
				})),

			removeFromCart: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				})),

			clearCart: () => set({ items: [] }),
		}),
		{
			name: "furniture-cart-storage",
		}
	)
);
