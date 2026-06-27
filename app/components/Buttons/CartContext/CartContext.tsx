"use client";
import { Product } from "@/app/data/typesProducts";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem extends Product {
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (product: Product) => {
		setCart((prevCart) => {
			const isExist = prevCart.find((item) => item.id === product.id);

			if (isExist) {
				return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

	return <CartContext.Provider value={{ cart, addToCart, cartCount }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
};
