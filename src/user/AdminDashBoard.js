/** @format */

import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
	const {
		user: { name, lastname, email, role },
	} = isAuthenticated();

	const adminLeftSide = () => {
		return (
			<div className='card bg-secondary'>
				<h4 className='card-header text-white '>Admin Navigation</h4>
				<ul className='list-group'>
					<li className='list-group-item'>
						<Link to='/admin/create/category' className='nav-link text-primary'>
							Create Categories
						</Link>
					</li>
					<li className='list-group-item'>
						<Link to='/admin/create/product' className='nav-link text-primary'>
							Create Product
						</Link>
					</li>
					<li className='list-group-item'>
						<Link to='/admin/categories' className='nav-link text-primary'>
							Manage Categories
						</Link>
					</li>
					<li className='list-group-item'>
						<Link to='/admin/products' className='nav-link text-primary'>
							Manage Products
						</Link>
					</li>
					<li className='list-group-item'>
						<Link to='/admin/orders' className='nav-link text-primary'>
							Manage Orders
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminRightSide = () => {
		return (
			<div>
				<div className='card mb-4 '>
					<h4 className=' card-header text-secondary'>Admin Information</h4>
					<ul className='list-group'>
						<li className='list-group-item'>
							<span className='badge alert-secondary text-secondary mr-2'>
								Name:
							</span>
							{name}
						</li>
						<li className='list-group-item'>
							<span className='badge alert-secondary text-secondary mr-2'>
								Last Name:
							</span>

							{lastname}
						</li>
						<li className='list-group-item'>
							<span className='badge alert-secondary text-secondary mr-2'>
								Email:
							</span>
							{email}
						</li>
						<li className='list-group-item'>
							<span className='badge alert-danger text-danger mr-2'>
								Admin Area
							</span>
						</li>
					</ul>
				</div>
				<button type='button' class='btn btn-primary'>
					Update Profile
				</button>
			</div>
		);
	};

	return (
		<Base
			title='Welcome! to admin area '
			description='Congratulations you are admin 😃 and work hard'
			className='container bg-white p-4 '>
			<div className='row '>
				<div className='col-3'>{adminLeftSide()}</div>
				<div className='col-9'>{adminRightSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
