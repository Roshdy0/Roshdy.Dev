"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/app/store/useCartStore";
import { checkoutSchema, CheckoutFormData } from "./checkoutSchema";
import "./page.css";

const GOVERNORATE = [
	{ name: "Cairo", fee: 50 },
	{ name: "Giza", fee: 50 },
	{ name: "Alexandria", fee: 65 },
];

export default function CheckoutPage() {
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [shippingFee, setShippingFee] = useState(0);

	const cartItems = useCartStore((state) => state.items);
	const clearCart = useCartStore((state) => state.clearCart);

	const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	const grandTotal = subtotal + shippingFee;

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			paymentMethod: "COD",
		},
	});

	const selectedGovernorate = watch("governorate");
	useEffect(() => {
		const gov = GOVERNORATE.find((g) => g.name === selectedGovernorate);
		setShippingFee(gov ? gov.fee : 0);
	}, [selectedGovernorate]);

	useEffect(() => {
		if (cartItems.length === 0 && !isSubmitting) {
			router.push("/");
		}
	}, [cartItems, router, isSubmitting]);

	const onSubmit = async (data: CheckoutFormData) => {
		setIsSubmitting(true);

		const finalOrderPayload = {
			customerDetails: data,
			products: cartItems.map((item) => ({
				id: item.id,
				name: item.name,
				quantity: item.quantity,
				price: item.price,
			})),
			financial: {
				subtotal,
				shippingFee,
				grandTotal,
			},
		};

		console.log("Sending Payload to Backend Server...", finalOrderPayload);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsSubmitting(false);

		if (data.paymentMethod === "ONLINE") {
			alert("Redirecting to secure payment gateway...");
			window.location.href = "https://checkout.stripe.com/mock-session";
		} else {
			clearCart();
			router.push("/checkout/success");
		}
	};

	if (cartItems.length === 0) return null;

	return (
		<div className="checkout-container px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left Column: Shipping & Payment Form */}
				<main className="lg:col-span-7 checkout-main">
					<h1 className="main-title">Shipping & Payment Details</h1>

					<form onSubmit={handleSubmit(onSubmit)} className="checkout-form" aria-label="Checkout Form">
						<div className="form-group">
							<label className="form-label" aria-label="Full Name">
								Full Name
							</label>
							<input type="text" {...register("fullName")} className={`form-input ${errors.fullName ? "input-error" : ""}`} placeholder="John Doe" aria-label="Full Name" />
							{errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="form-group">
								<label className="form-label" aria-label="Phone Number">
									Phone Number
								</label>
								<input type="tel" {...register("phone")} className={`form-input ${errors.phone ? "input-error" : ""}`} placeholder="01xxxxxxxxx" aria-label="Phone Number" />
								{errors.phone && <p className="error-message">{errors.phone.message}</p>}
							</div>

							<div className="form-group">
								<label className="form-label" aria-label="Governorate">
									Governorate
								</label>
								<select {...register("governorate")} className={`form-select ${errors.governorate ? "input-error" : ""}`} aria-label="Governorate">
									<option value="">Select Governorate</option>
									{GOVERNORATE.map((g) => (
										<option key={g.name} value={g.name} aria-label={g.name}>
											{g.name}
										</option>
									))}
								</select>
								{errors.governorate && (
									<p className="error-message" aria-label="Governorate Error">
										{errors.governorate.message}
									</p>
								)}
							</div>
						</div>

						<div className="form-group">
							<label className="form-label" aria-label="City / Area">
								City / Area
							</label>
							<input type="text" {...register("city")} className={`form-input ${errors.city ? "input-error" : ""}`} placeholder="Maadi / Heliopolis" aria-label="City / Area" />
							{errors.city && (
								<p className="error-message" aria-label="City Error">
									{errors.city.message}
								</p>
							)}
						</div>

						<div className="form-group">
							<label className="form-label" aria-label="Detailed Address">
								Detailed Address
							</label>
							<textarea
								rows={3}
								{...register("streetAddress")}
								className={`form-textarea ${errors.streetAddress ? "input-error" : ""}`}
								placeholder="Street name, building number, floor, apartment..."
								aria-label="Detailed Address"
							/>
							{errors.streetAddress && (
								<p className="error-message" aria-label="Detailed Address Error">
									{errors.streetAddress.message}
								</p>
							)}
						</div>

						<div className="payment-section">
							<label className="payment-title" aria-label="Preferred Payment Method">
								Preferred Payment Method
							</label>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<label className="payment-label">
									<input type="radio" value="COD" {...register("paymentMethod")} className="radio-input" aria-label="Cash on Delivery" />
									<div className="option-text">
										<span className="option-title">Cash on Delivery (COD)</span>
										<span className="option-desc">Pay with cash upon receiving your order.</span>
									</div>
								</label>

								<label className="payment-label">
									<input type="radio" value="ONLINE" {...register("paymentMethod")} className="radio-input" aria-label="Credit Card / Digital Wallet" />
									<div className="option-text">
										<span className="option-title">Credit Card / Digital Wallet</span>
										<span className="option-desc">Secure payment via Stripe, Paymob or Vodafone Cash.</span>
									</div>
								</label>
							</div>
							{errors.paymentMethod && (
								<p className="error-message" aria-label="Payment Method Error">
									{errors.paymentMethod.message}
								</p>
							)}
						</div>

						<button type="submit" disabled={isSubmitting} className="submit-btn" aria-label="Place Order">
							{isSubmitting ? (
								<span className="loader-container">
									<svg className="spinner" viewBox="0 0 24 24" fill="none">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Processing your order...
								</span>
							) : (
								"Place Order 🚀"
							)}
						</button>
					</form>
				</main>

				<aside className="lg:col-span-5 checkout-aside">
					<div className="summary-card">
						<h2 className="summary-title">Order Summary ({cartItems.length})</h2>

						<div className="products-list">
							{cartItems.map((item) => (
								<div key={item.id} className="product-item">
									<div className="img-container">
										<Image src={`${item.pathImg}${item.image}`} alt={item.name} fill className="object-cover" />
									</div>
									<div className="product-info">
										<h3 className="product-name">{item.name}</h3>
										<p className="product-qty">Qty: {item.quantity}</p>
									</div>
									<div className="product-price">${(item.price * item.quantity).toFixed(2)}</div>
								</div>
							))}
						</div>

						<div className="financial-details">
							<div className="financial-row">
								<span>Subtotal:</span>
								<span className="value-highlight">${subtotal.toFixed(2)}</span>
							</div>
							<div className="financial-row">
								<span>Shipping Fee:</span>
								<span className="value-highlight">{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Select governorate first"}</span>
							</div>
							<div className="total-row">
								<span>Grand Total:</span>
								<span className="total-price">${grandTotal.toFixed(2)}</span>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
