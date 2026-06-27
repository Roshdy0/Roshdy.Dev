"use client";
import { useEffect } from "react";
import { useRecentViewedStore } from "@/app/store/useRecentViewedStore";
import { Product } from "@/app/data/typesProducts";

export default function RecentViewTracker({ product }: { product: Product }) {
	const addToRecent = useRecentViewedStore((state) => state.addToRecent);

	useEffect(() => {
		if (product) {
			addToRecent(product);
		}
	}, [product, addToRecent]);

	return null;
}
