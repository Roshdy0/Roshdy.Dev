"use client";
import allProducts from "@/app/data/products.json";
import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFire, faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: { key: string }) => {
			if (event.key === "Escape") {
				setIsFocused(false);
				setSearchQuery("");
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const filteredResults = useMemo(() => {
		if (searchQuery.length === 0) {
			return allProducts.filter((p) => p.trending);
		}

		const results = allProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
		return results;
	}, [searchQuery, allProducts]);

	return (
		<div className="search-wrapper">
			<button
				className="mobile-search-trigger"
				onClick={() => {
					setIsMobileOpen(true);
					setIsFocused(true);
				}}
				aria-label="Open search"
			>
				<FontAwesomeIcon icon={faSearch} />
			</button>

			<div className={`search-container relative ${isMobileOpen ? "is-mobile-open" : ""}`}>
				<span className="search-icon-wrapper">
					<FontAwesomeIcon icon={faSearch} />
				</span>
				<input
					type="text"
					placeholder="Search..."
					className="search-input"
					value={searchQuery}
					onFocus={() => setIsFocused(true)}
					onChange={(e) => setSearchQuery(e.target.value)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
					aria-label="Search"
				/>

				<div className={`search-results-dropdown ${isFocused ? "is-visible" : ""}`}>
					<div className="trending-header">
						<FontAwesomeIcon icon={faFire} className="fire-icon" />
						<span>{searchQuery ? "Search Results" : "Trending Gear"}</span>
					</div>
					<div className="results-list">
						{filteredResults.length > 0 ? (
							filteredResults.map((item) => (
								<div key={item.id} className="result-item">
									<div className="item-info">
										<h4>{item.name}</h4>
										<span className="price">{item.price}</span>
									</div>
								</div>
							))
						) : (
							<div className="no-results">No gear found for "{searchQuery}"</div>
						)}
					</div>
				</div>

				<button className="md:hidden absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setIsMobileOpen(false)} aria-label="Close search">
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</div>
		</div>
	);
};

export default Search;
