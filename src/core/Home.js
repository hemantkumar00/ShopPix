/** @format */

import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState([]);

	const loadAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				setError(data.error);
				console.log(error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base title='Home Page' description='Probably best space to buy PHOTO'>
			<div className='row text-center mt-5'>
				<div className='row'>
					{products.map((product, index) => {
						return (
							<div key={index} className='col-4 mb-5 m-auto'>
								<Card product={product} />
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
};

export default Home;
