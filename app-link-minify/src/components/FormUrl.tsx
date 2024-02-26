"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { nanoid } from "nanoid";

export default function FormUrl() {
	const [url, setUrl] = useState<string>("");
	function asegurarHttp(url: string) {
		// Primero, verificamos si la URL es válida.
		const regex =
			/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
		if (regex.test(url)) {
			// Si es válida pero no comienza con http:// o https://, le añadimos http:// al inicio.
			if (!/^https?:\/\//i.test(url)) {
				return `http://${url}`;
			}
			// Si ya es una URL válida con http:// o https://, la retornamos como está.
			return url;
		}
	}

	async function createNewShort() {
		const linkToShort = asegurarHttp(url);
		const rta = await fetch("/api/urls", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: linkToShort,
				code: nanoid(7),
			}),
		});
		setUrl("");
		const data = await rta.json();
		localStorage.setItem("urlsCreated", JSON.stringify(data));
	}

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createNewShort();
				}}
				className=" flex flex-col md:flex-row items-center justify-center w-full gap-2"
			>
				<Input
					type="text"
					placeholder="Enter your link here"
					required
					value={url}
					onChange={(e) => {
						e.preventDefault;
						setUrl(e.target.value);
					}}
					className="w-64 text-white animate-fade-in-right animate-delay-700 border-white selection:ring-offset-transparent focus:bg-white hover:bg-white hover:text-black duration-200 focus:text-black bg-transparent rounded-3xl border-4 px-6  py-6  "
				/>
				<Button
					type="submit"
					className="border-4 rounded-3xl px-5 animate-fade-in-left animate-delay-700 py-5 hover:bg-white hover:text-black border-white hover:scale-105 duration-200"
				>
					Shorten URL
				</Button>
			</form>
		</>
	);
}