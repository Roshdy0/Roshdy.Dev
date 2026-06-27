import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faUser, faLink, faComment, faEnvelope, faStore } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer section-under-hero">
			<div className="container mx-auto px-4">
				<div className="footer-grid">
					<div className="footer-brand">
						<div className="logo">
							ROSHDY.<span>DEV</span>
						</div>
						<p>Premium developer gear designed for your setup.</p>
					</div>

					<div className="footer-links">
						<h3>Professional</h3>
						<ul>
							<li>
								<a href="https://portfolio-blush-theta-7kv6gy2k7x.vercel.app/" target="_blank" aria-label="View portfolio">
									<FontAwesomeIcon icon={faUser} className="icon-style" /> Portfolio
								</a>
							</li>
							<li>
								<a href="https://github.com/Roshdy0" target="_blank" aria-label="View GitHub profile">
									<FontAwesomeIcon icon={faCode} className="icon-style" /> GitHub
								</a>
							</li>
							<li>
								<a href="https://www.linkedin.com/in/roshdy-mammdouh-2b29653b1/" target="_blank" aria-label="View LinkedIn profile">
									<FontAwesomeIcon icon={faLink} className="icon-style" /> LinkedIn
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-links">
						<h3>Contact</h3>
						<ul>
							<li>
								<a href="https://wa.me/+0201117651690" target="_blank" aria-label="Chat on WhatsApp">
									<FontAwesomeIcon icon={faComment} className="icon-style" /> WhatsApp
								</a>
							</li>
							<li>
								<a href="mailto:contact@roshdy.dev" aria-label="Send email">
									<FontAwesomeIcon icon={faEnvelope} className="icon-style" /> Email Me
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-links">
						<h3>Shop</h3>
						<ul>
							<li>
								<a href="#" aria-label="View best sellers">
									<FontAwesomeIcon icon={faStore} className="icon-style" /> Best Sellers
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="footer-bottom">
					<p>© {new Date().getFullYear()} ROSHDY.DEV - All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
