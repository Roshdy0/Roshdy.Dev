"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkMode = () => {
	const [isDark, setIsDark] = useState(false);

	const toggleTheme = () => {
		if (isDark) {
			document.documentElement.classList.remove("dark");
			setIsDark(false);
		} else {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		}
	};

	useEffect(() => {
		const isDarkTheme = document.documentElement.classList.contains("dark");
		setIsDark(isDarkTheme);
	}, []);

	return (
		<button className="icon Toggle-Theme" onClick={toggleTheme} aria-label="Toggle Theme">
			{isDark ? <FontAwesomeIcon icon={faSun} className="theme-icon sun" /> : <FontAwesomeIcon icon={faMoon} className="theme-icon moon" />}
		</button>
	);
};

export default DarkMode;
