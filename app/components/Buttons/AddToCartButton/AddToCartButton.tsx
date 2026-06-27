// app/component/AddToCartButton/AddToCartButton.tsx
"use client";
import { useState } from "react";
import { Product } from "@/app/data/typesProducts";
import { useCartStore } from "@/app/store/useCartStore";
import "./AddToCartButton.css";

interface AddToCartButtonProps {
	product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const addToCart = useCartStore((state) => state.addToCart);

	const [isAdded, setIsAdded] = useState(false);

	const handleAddToCart = () => {
		addToCart(product);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2000);
	};

	return (
		<button className="action-btn add-to-cart added-animation" onClick={handleAddToCart} aria-label="Add to cart">
			Add To Cart
		</button>
	);
}
