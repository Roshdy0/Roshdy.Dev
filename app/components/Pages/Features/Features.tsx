import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faShieldHalved, faHeadset } from "@fortawesome/free-solid-svg-icons";
import "./Features.css";

const Features = () => {
	const features = [
		{
			icon: faTruckFast,
			title: "Fast Delivery",
			description: "Worldwide shipping in 3-5 days",
		},
		{
			icon: faShieldHalved,
			description: "100% secure payment processing",
		},
		{
			icon: faHeadset,
			title: "24/7 Support",
			description: "Dedicated support team anytime",
		},
	];

	return (
		<section className="features-strip section-under-hero">
			<div className="container mx-auto">
				<div className="feature grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{features.map((feature, index) => (
						<div key={index} className="feature-item">
							<div className="icon-wrapper">
								<FontAwesomeIcon icon={feature.icon} />
							</div>
							<div className="content">
								<h4>{feature.title}</h4>
								<p>{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
