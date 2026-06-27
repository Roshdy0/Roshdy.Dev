"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/store/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";

const Cart = () => {
	const cartItems = useCartStore((state) => state.items);

	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeFromCart = useCartStore((state) => state.removeFromCart);

	const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<section className="cart-section">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-black mb-8">
					Your <span className="text-primary">Cart</span>
				</h2>

				<div className="cart-container">
					<div className="cart-items">
						{cartItems.length === 0 ? (
							<p className="text-center text-gray-500 py-8">Your cart is empty.</p>
						) : (
							cartItems.map((item) => (
								<div key={item.id} className="cart-item">
									<div className="item-image">
										<Image src={`${item.pathImg}${item.image}`} alt={item.name} fill className="object-contain p-2" />
									</div>
									<div className="item-details">
										<h4>{item.name}</h4>
										<p>${item.price.toFixed(2)}</p>
									</div>
									<div className="item-controls">
										<button className="quantity-btn" onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity">
											<FontAwesomeIcon icon={faMinus} size="xs" />
										</button>
										<span>{item.quantity}</span>
										<button className="quantity-btn" onClick={() => increaseQuantity(item.id)} aria-label="Increase quantity">
											<FontAwesomeIcon icon={faPlus} size="xs" />
										</button>
										<button className="quantity-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove from cart">
											<FontAwesomeIcon icon={faTrash} size="xs" />
										</button>
									</div>
								</div>
							))
						)}
					</div>

					<div className="cart-summary">
						<h3>Order Summary</h3>
						<div className="summary-row">
							<span>Subtotal</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="summary-row">
							<span>Shipping</span>
							<span>FREE</span>
						</div>
						<div className="summary-row total">
							<span>Total</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>

						{cartItems.length > 0 ? (
							<Link href="/checkout" className="checkout-step-btn" aria-label="Proceed to checkout">
								PROCEED TO CHECKOUT 🚀
							</Link>
						) : (
							<button className="checkout-btn opacity-50 cursor-not-allowed" disabled aria-label="Cart is empty">
								CART IS EMPTY
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cart;
