// Definition of the product structure to ensure type safety
export interface Product {
	id: number;
	name: string;
	category: string;
	price: number;
	oldPrice?: number;
	image: string;
	rating: number;
	isNew?: boolean;
}

export const PRODUCTS: Product[] = [
	{
		id: 1,
		name: "Developer Desk Mat",
		category: "Setup",
		price: 45.0,
		oldPrice: 60.0,
		image: "/Image/BestSellers/Developer Desk Mat.webp",
		rating: 5,
		isNew: true,
	},
	{
		id: 2,
		name: "Mechanical Keyboard G-Pro",
		category: "Hardware",
		price: 120.0,
		image: "/Image/BestSellers/keyboard.webp",
		rating: 4,
	},
	{
		id: 3,
		name: "Ergonomic Office Chair",
		category: "Furniture",
		price: 299.0,
		oldPrice: 350.0,
		image: "/Image/BestSellers/chair.webp",
		rating: 5,
	},
	{
		id: 4,
		name: "Vertical Pro Mouse",
		category: "Hardware",
		price: 85.0,
		image: "/Image/BestSellers/mouse.webp",
		rating: 5,
	},
];
