import { useEffect, useState } from "react";

export default function WindowTracker({ windowStatus }) {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	function watchWindowWidth(): void {
		console.log("resized");
		setWindowWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", watchWindowWidth);
		// Cleanup function is required when there's something like an eventListener, webSocket or timer (inshort something out of React).
		return function (): void {
			window.removeEventListener("resize", watchWindowWidth);
		}
	}, []);

	// `useEffect` runs after the returned elements.
	return (
		<h1>Window Width : {windowWidth}</h1>
	);
}
