import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { CartProvider } from "@/app/components/Buttons/CartContext/CartContext";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faShoppingCart, faUser, faTrash);
config.autoAddCss = false;

import allProducts from "@/app/data/products.json";
import Header from "@/app/components/Pages/Header/Header";
import "./globals.css";

const Footer = dynamic(() => import("./components/Pages/Footer/Footer"), {
	loading: () => <div className="skeleton-loader" />,
	ssr: true,
});

export const metadata: Metadata = {
	title: {
		default: "Roshdy.Dev Store | Premium Developer Gear",
		template: "%s | Roshdy.Dev Store",
	},
	description: "The official Roshdy.Dev Store. Providing premium tools and technical gear to enhance your programming productivity.",
	keywords: ["Developer Accessories", "Developer Gear", "Mechanical Keyboards", "Tech Accessories", "Coding Setup"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" className={`h-full antialiased`}>
				<body className="min-h-full flex flex-col">
					<CartProvider>
						<Header products={allProducts} />
						{children}
						<Footer />
					</CartProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
