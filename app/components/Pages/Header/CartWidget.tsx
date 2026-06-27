"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, FocusEvent } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartWidget = () => {
	const [isOpen, setIsOpen] = useState(false);

	const cart = useCartStore((state) => state.items);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<div className="cart-widget-container" tabIndex={0} onBlur={handleBlur}>
			<div className="icon Shopping-Cart" onClick={() => setIsOpen(!isOpen)} aria-label="Open cart">
				<FontAwesomeIcon icon={faShoppingCart} />
				{cartCount > 0 && <span className="badge-populated">{cartCount}</span>}
			</div>

			{isOpen && (
				<div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
					{cart.length > 0 ? (
						<div className="cart-dropdown-content">
							<h3 className="dropdown-title">My Products:</h3>

							<div className="cart-items-list">
								{cart.map((item) => (
									<div key={item.id} className="cart-item">
										<div className="item-image-wrapper">
											<Image src={`${item.pathImg}${item.image}`} alt={item.name} fill className="object-cover" />
										</div>

										<div className="item-details">
											<h4 className="item-name">{item.name}</h4>
											<div className="item-meta">
												<span className="item-price">${item.price}</span>

												<div className="quantity-controls">
													<button className="quantity-btn" onClick={() => decreaseQuantity?.(item.id)} aria-label="Decrease quantity">
														<FontAwesomeIcon icon={faMinus} />
													</button>
													<span className="quantity-value">{item.quantity}</span>
													<button className="quantity-btn" onClick={() => increaseQuantity?.(item.id)} aria-label="Increase quantity">
														<FontAwesomeIcon icon={faPlus} />
													</button>
													<button className="quantity-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
														<FontAwesomeIcon icon={faTrash} size="xs" />
													</button>
												</div>
											</div>
										</div>

										<div className="item-total-price">${(item.price * item.quantity).toFixed(2)}</div>
									</div>
								))}
							</div>

							<div className="cart-subtotal">
								<p className="subtotal-label">Subtotal:</p>
								<p className="subtotal-amount">${totalPrice.toFixed(2)}</p>
							</div>

							<div className="cart-actions">
								<Link href="/cart" className="view-cart-btn" aria-label="View full cart">
									View Full Cart 🛒
								</Link>
								<Link href="/checkout" className="checkout-btn" aria-label="Proceed to checkout">
									Go to Checkout 🚀
								</Link>
							</div>
						</div>
					) : (
						<div className="empty-cart-message">
							<p>Your cart is empty</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CartWidget;
