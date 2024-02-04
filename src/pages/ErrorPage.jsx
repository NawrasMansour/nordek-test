import React from 'react'

// lib
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
		<main className="h-screen flex justify-center items-center text-center">
			<section className='bg-white S-630:px-10 px-3 S-630:py-20 py-10 rounded-md shadow-boxShadow mx-auto'>
				<h1 className="S-630:text-9xl text-7xl font-semibold text-clr-tx-yellow py-3">404</h1>
				<h3 className="tracking-wide capitalize mb-8 S-630:text-2xl text-lg text-clr-tx-black">
					Sorry, the page you tried cannot be found
				</h3>
				<Link
					to="/"
					className="hover:bg-clr-tx-gray-dark capitalize transition-all ease-in-out delay-75 px-6 py-3 font-semibold bg-clr-tx-gray text-clr-tx-white rounded-lg"
				>
					back home
				</Link>
			</section>
		</main>
	);
}

export default ErrorPage