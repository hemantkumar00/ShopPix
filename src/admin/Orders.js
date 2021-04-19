/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrders } from '../core/helper/orderHelper';

const Orders = () => {
	const [orders, setOrders] = useState([]);

	const { user, token } = isAuthenticated();

	const preload = () => {
		getOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
				console.log(data);
			}
		});
	};
	useEffect(() => {
		preload();
	}, []);
	return (
		<Base
			title='Add Product !'
			description='Welcome to product creation area'
			className='container bg-white  p-4'>
			<p className='text-secondary'>All Orders resived till date</p>
			<Link to='/admin/dashboard' className='btn btn-md btn-secondary mb-3'>
				Dashboard
			</Link>
			<div className='row'>
				{orders.map((order, index) => {
					return (
						<div key={index} className='row text-center'>
							<p className='text-secondary  col-3'>{index + 1}.</p>
							<p className='text-secondary  col-3'>{order.amount} $</p>
							<p className='text-secondary  col-3'>{order.status}</p>
							<div className='col-3 row text-secondary'>
								{order.products.map((product, index) => {
									return (
										<div key={index} className='row text-center'>
											<p className=''>{product.name}, </p>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default Orders;
