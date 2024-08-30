"use client";
// pages/EventDetail.js
import Image from "next/image";
import Navbar from "@/components/navbarUser";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EventDetail() {
	const [quantity, setQuantity] = useState(1);
	const [inputValue, setInputValue] = useState("1");
	const [username, setUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [image, setImage] = useState("");
	const [role, setRole] = useState("");
	const [token, setToken] = useState("");
	const [Googleusername, setGoogleUsername] = useState("");
	const [GoogleuserId, setGoogleUserId] = useState("");
	const [Googleimage, setGoogleImage] = useState("");
	const [Googlerole, setGoogleRole] = useState("");
	const [Googletoken, setGoogleToken] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Check if Google login data is present in URL query parameters
		const Googletoken = searchParams.get("token") || ""; // Default to empty string if null
		const GoogleuserId = searchParams.get("id") || ""; // Default to empty string if null
		const Googleusername = searchParams.get("username") || ""; // Default to empty string if null
		const Googleimage = searchParams.get("image") || ""; // Default to empty string if null
		const Googlerole = searchParams.get("role") || ""; // Default to empty string if null

		if (Googletoken && GoogleuserId && Googleusername) {
			// If Google login data is present, use it
			setGoogleUserId(GoogleuserId);
			setGoogleUsername(Googleusername);
			setGoogleImage(Googleimage);
			setGoogleRole(Googlerole);
			setGoogleToken(Googletoken);

			// Save Google login data to sessionStorage
			sessionStorage.setItem("userId", GoogleuserId);
			sessionStorage.setItem("username", Googleusername);
			sessionStorage.setItem("image", Googleimage);
			sessionStorage.setItem("role", Googlerole);
			sessionStorage.setItem("token", Googletoken);

			// Clean up the URL query parameters
			const cleanUrl = window.location.origin + window.location.pathname;
			window.history.replaceState(null, "", cleanUrl);
		} else {
			// If no Google login data, fall back to traditional login data from sessionStorage
			const savedUsername = sessionStorage.getItem("username") || "";
			const savedUserId = sessionStorage.getItem("userId") || "";
			const savedImage = sessionStorage.getItem("image") || "";
			const savedRole = sessionStorage.getItem("role") || "";
			const savedToken = sessionStorage.getItem("token") || "";

			if (savedUsername) {
				setUsername(savedUsername);
				setUserId(savedUserId);
				setImage(savedImage);
				setRole(savedRole);
				setToken(savedToken);
			}
		}
	}, [searchParams, router]);

	const handleIncrement = () => {
		setQuantity((prev) => prev + 1);
		setInputValue((prev) => (Number(prev) + 1).toString());
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
			setInputValue((prev) => (Number(prev) - 1).toString());
		}
	};

	const handleBlur = () => {
		if (quantity < 1) {
			setQuantity(1);
			setInputValue("1");
		}
	};

	const handleFocus = (e: { target: { value: string } }) => {
		if (e.target.value === "0") {
			setInputValue("");
		}
	};

	const handleChange = (e: { target: { value: string } }) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			// Ensure that the input is a number
			setInputValue(value);
			if (value === "") {
				setQuantity(0);
			} else {
				setQuantity(Number(value));
			}
		}
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (username == ""){
			alert("Please login first");
			router.push('/login');
		} else {
			console.log("Submitting form with quantity:", quantity);
			router.push('/buy-ticket');
		}
  };

	return (
		<div>
			<Navbar userName={username} token={token} />
			<div className="flex flex-col md:flex-row p-4">
				<div className="md:w-1/2 pl-[89px] pt-[50px]">
					<Image src="/svgs/img1.svg" alt="Event Image" width={402} height={558} className="w-2/3 h-full" />
				</div>
				<div className="md:w-1/2 pt-[50px]">
					<h1 className="text-3xl font-bold mb-4">Music Festival by Universitas Paramadina</h1>
					<p className="text-xl text-blue-600 mb-4 font-bold">Rp 130.000</p>
					<p className="mb-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore <br /> magna aliqua. Ut enim ad minim veniam, quis nostrud <br /> exercitation ullamco laboris nisi ut aliquip
						ex ea <br /> commodo consequat. Duis aute irure dolor in reprehenderit in <br /> voluptate velit esse cillum dolore eu <br /> fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br /> non proident, sunt in culpa qui
						officia deserunt mollit <br /> anim id est laborum.
					</p>
					<ul className="mb-4">
						<li className="mb-4">
							<strong className="mr-[134px]">Location :</strong> Gedung C
						</li>
						<li className="mb-4">
							<strong className="mr-[128px]">Schedule :</strong> 20 - 07 - 2024
						</li>
						<li className="mb-4">
							<strong className="mr-[163px]">Time :</strong> 15.00 - End
						</li>
						<li className="mb-4">
							<strong className="mr-[120px]">Protection :</strong> Proteksi Pengembalian Uang Jika Acara Terdapat Perubahan
						</li>
						<li className="mb-2">
							<strong className="mr-[114px]">Guarantee :</strong> Receive your order or get your money back.
						</li>
					</ul>
					<div className="flex items-center mb-4">
						<label className="mr-2" htmlFor="quantity">
							Kuantitas:
						</label>
						<div className="flex items-center border rounded">
							<button className="px-2 py-1 text-lg" onClick={handleDecrement}>
								-
							</button>
							<input
								type="text" // Change input type to text to handle empty value
								id="quantity"
								name="quantity"
								value={inputValue}
								onChange={handleChange}
								onBlur={handleBlur}
								onFocus={handleFocus}
								className="w-16 border-none text-center no-spinner"
							/>
							<button className="px-2 py-1 text-lg" onClick={handleIncrement}>
								+
							</button>
						</div>
					</div>
					<button className="bg-blue-600 text-white px-8 py-4 rounded" onClick={handleSubmit}>Buy Now</button>
				</div>
			</div>
		</div>
	);
}
