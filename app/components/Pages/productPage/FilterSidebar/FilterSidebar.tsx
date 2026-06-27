"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { faTimes, faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./FilterSidebar.css";

interface Props {
	categories: { name: string; count: number }[];
}

export default function FilterSidebar({ categories }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [price, setPrice] = useState(searchParams.get("maxPrice") || "1000");

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPrice(value);

		const params = new URLSearchParams(searchParams.toString());
		params.set("maxPrice", value);
		router.push(`${pathname}?${params.toString()}`);
	};

	const updateFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (params.get(key) === value) {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		router.push(`${pathname}?${params.toString()}`);
		setIsDropdownOpen(false);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="filter-sidebar-container">
			<button className="mobile-filter-toggle" onClick={() => setIsOpen(true)} aria-label="Open filters">
				<FontAwesomeIcon icon={faFilter} />
			</button>

			<aside className={`filter-sidebar ${isOpen ? "open" : ""}`}>
				<div className="filter-header">
					<h2 className="title">Filters</h2>
					<button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close filters">
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</div>

				<div className="filter-group" ref={dropdownRef}>
					<button className="category-toggle-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-label="Toggle categories">
						<span>Categories</span>
						<FontAwesomeIcon icon={faChevronDown} className={`chevron-icon ${isDropdownOpen ? "rotated" : ""}`} />
					</button>

					{isDropdownOpen && (
						<div className="Dropdown shadow-lg">
							{categories.map((cat) => (
								<button
									key={cat.name}
									onClick={() => updateFilter("category", cat.name)}
									className={searchParams.get("category") === cat.name ? "active-category" : ""}
									aria-label={`Filter by ${cat.name}`}
								>
									<span>{cat.name}</span>
									<span className="text-gray-400 text-sm">({cat.count})</span>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="filter-group">
					<h3 className="group-title">Price Range (Max: ${price})</h3>
					<div className="rating-list">
						<input type="range" min="0" max="1000" value={price} onChange={handlePriceChange} className="custom-range" aria-label="Price range" />
					</div>
				</div>

				<div className="filter-group">
					<h3 className="group-title">Rating</h3>
					<select className="sort-select" onChange={(e) => updateFilter("rating", e.target.value)} value={searchParams.get("rating") || ""} aria-label="Filter by rating">
						<option value="" aria-label="All ratings">
							All Ratings
						</option>
						<option value="5" aria-label="5 stars & up">
							5 Stars & Up
						</option>
						<option value="4" aria-label="4 stars & up">
							4 Stars & Up
						</option>
						<option value="3" aria-label="3 stars & up">
							3 Stars & Up
						</option>
						<option value="2" aria-label="2 stars & up">
							2 Stars & Up
						</option>
						<option value="1" aria-label="1 star & up">
							1 Star & Up
						</option>
					</select>
				</div>

				<div className="filter-group">
					<h3 className="group-title">Sort By</h3>
					<select className="sort-select" onChange={(e) => updateFilter("sort", e.target.value)} value={searchParams.get("sort") || ""} aria-label="Sort by">
						<option value="price-low" aria-label="Sort by price: Low to High">
							Price: Low to High
						</option>
						<option value="price-high" aria-label="Sort by price: High to Low">
							Price: High to Low
						</option>
					</select>
				</div>

				<button onClick={() => router.push(pathname)} className="clear-btn" aria-label="Clear Filters">
					Clear All
				</button>
			</aside>

			{isOpen && <div className="filter-overlay" onClick={() => setIsOpen(false)} />}
		</div>
	);
}
