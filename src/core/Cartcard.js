/** @format */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { addItemToCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Cartcard = ({ product, addtoCart = true, removeFromCart = false }) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cardTitle = product ? product.name : 'A Photo from pexels';
	const cardDescription = product
		? product.description
		: 'this photo looks great';
	const cardPrice = product ? product.price : 'Default';

	const addToCart = () => {
		addItemToCart(product, () => {
			setRedirect(true);
		});
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return alert(`${product.name} is added to your cart`);
		}
	};

	const showAddToCart = () => {
		return (
			addtoCart && (
				<button
					onClick={addToCart}
					className='btn btn-block btn-outline-info mt-1 mb-1'>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = () => {
		return (
			removeFromCart && (
				<button
					onClick={() => {}}
					className='btn btn-block btn-outline-danger mt-1 mb-1'>
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div className='card text-white bg-white border border-secandry col-10'>
			<div className='card-header lead text-primary '>{cardTitle}</div>
			<div className='card-body'>
				{getARedirect(redirect)}

				<div className='rounded border border-info p-2 col-5'>
					<ImageHelper product={product} />
				</div>
				<div className='col-7'>
					<p className='lead bg-info font-weight-normal text-wrap mt-2'>
						{cardDescription}
					</p>
					<p className='btn btn-info rounded  btn-sm px-4'>$ {cardPrice}</p>
					<div className='row'>
						<div className='col-12'>{showAddToCart(addtoCart)}</div>
						<div className='col-12'>{showRemoveFromCart(removeFromCart)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cartcard;
