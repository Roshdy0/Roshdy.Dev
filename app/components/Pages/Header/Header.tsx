"use client";
import Link from "next/link";
import { useState } from "react";
import Sign from "./Sign";
import Search from "./Search";
import DarkMode from "./DarkMode";
import CartWidget from "./CartWidget";
import { Product } from "@/app/data/typesProducts";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ products }: { products: Product[] }) => {
	const favorites = useFavoritesStore((state) => state.favorites);

	return (
		<header className="header-wrapper">
			<div className="container mx-auto">
				<div className="flex h-16 items-center justify-between gap-2">
					<div className="logo">
						<Link href="/" className="logo-container" aria-label="Home">
							ROSHDY.<span className="logo-text">DEV</span>
						</Link>
					</div>

					<Search />

					<DarkMode />

					<CartWidget />

					<Link href="/wishlist" className="icon wishlist-link" aria-label="View wishlist">
						<FontAwesomeIcon icon={faHeart} />
						{favorites.length > 0 && <span className="badge-populated">{favorites.length}</span>}
					</Link>

					<Sign />
				</div>
			</div>
		</header>
	);
};

export default Header;
