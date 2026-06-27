// app/component/AddToCartButton/AddToCartButtonId`.tsx
"use client";
import { useState } from "react";
import { Product } from "@/app/data/typesProducts";
import { useCartStore } from "@/app/store/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
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
		<button className={`add-to-cart-btn ${isAdded ? "added" : ""}`} onClick={handleAddToCart} disabled={isAdded} aria-label="Add to cart">
			<span className="icon-container">
				<FontAwesomeIcon icon={isAdded ? faCheck : faCartPlus} />
			</span>
			<span className="text-container">{isAdded ? "Added!" : "Add to Cart"}</span>
		</button>
	);
}
