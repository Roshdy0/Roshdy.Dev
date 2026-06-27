"use client";
import { useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Sign = () => {
	const { isSignedIn, isLoaded } = useUser();
	const router = useRouter();

	if (!isLoaded) return null;

	return (
		<div className="auth-wrapper">
			{!isSignedIn ? (
				<button onClick={() => router.push("/sign-in")} className="login-trigger-btn" aria-label="Log in">
					LOG IN
					<FontAwesomeIcon icon={faUser} />
				</button>
			) : (
				<UserButton />
			)}
		</div>
	);
};

export default Sign;
