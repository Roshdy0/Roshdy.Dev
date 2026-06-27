// @/app/data/typesProducts.ts
export interface Product {
	id: number;
	name: string;
	date: string;
	image: string;
	price: number;
	rating: number;
	pathImg: string;
	oldPrice: number;
	trending?: boolean;
	description: string;
	categories: string[];
}
