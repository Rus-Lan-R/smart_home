import React from "react";
import backgroundH from "../../img/homeGIF.gif";

function StartPage() {
	return (
		<div
			style={{
				backgroundImage: "url(" + backgroundH + ")",
				backgroundSize: "cover",
				height: "94vh",
			}}
		></div>
	);
}

export default StartPage;
