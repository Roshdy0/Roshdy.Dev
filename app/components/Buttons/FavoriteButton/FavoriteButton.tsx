// components/FavoriteButton/FavoriteButton.tsx
"use client";
import { useState, useEffect } from "react";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/app/data/typesProducts";

export default function FavoriteButton({ product }: { product: Product }) {
	const [isMounted, setIsMounted] = useState(false);
	const { favorites, toggleFavorite } = useFavoritesStore();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const isFav = isMounted && favorites.some((item) => item.id === product.id);

	return (
		<button
			onClick={(e) => {
				toggleFavorite(product);
				const btn = e.currentTarget;
				btn.classList.add("heart-pop");
				setTimeout(() => btn.classList.remove("heart-pop"), 400);
			}}
			className={`action-btn favorite-btn ${isFav ? "active" : ""}`}
			aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
		>
			<FontAwesomeIcon icon={faHeart} />
		</button>
	);
}
