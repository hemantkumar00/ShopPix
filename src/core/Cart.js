/** @format */

import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Payment from './Payment';

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = (products) => {
		return (
			<div c>
				<p className='text-secondary display-6 mb-5'>Product's added to cart</p>
				<div className=' col-8 m-auto '>
					{products.map((product, index) => (
						<Card
							key={index}
							product={product}
							addtoCart={false}
							removeFromCart={true}
							setReload={setReload}
							reload={reload}
						/>
					))}
				</div>
			</div>
		);
	};

	const loadCheckout = () => {
		return (
			<div>
				<p className='text-secondary display-6 mb-5'>Payment to Checkout</p>
			</div>
		);
	};

	return (
		<Base title='Cart Page' description='Ready to check out'>
			<div className='row  text-center'>
				<div className='col-6'>
					{products.length > 0 ? (
						loadAllProducts(products)
					) : (
						<p className='text-secondary display-6 mb-5'>
							No Product's as of now
						</p>
					)}
				</div>
				<div className='col-6'>
					<Payment products={products} setReload={setReload} />
				</div>
			</div>
		</Base>
	);
};

export default Cart;
