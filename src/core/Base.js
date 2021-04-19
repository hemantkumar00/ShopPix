/** @format */

import React from 'react';
import Menu from './Menu';

const Base = ({
	title = 'My Title',
	description = 'My desription',
	className = ' text-white p-4',
	children,
}) => (
	<div className='hello '>
		<Menu />
		<div className='container-fluid p-5 '>
			<div className='jumbotron  text-primary text-center'>
				<h2 className='display-4'>{title}</h2>
				<p className='lead'>{description}</p>
			</div>
			<div className={className}>{children}</div>
		</div>
		<footer className='footer bg-secondary mt-auto py-2'>
			<div className='container-fluid  text-white text-center py-2'>
				<p className='lead'>
					If you got any questions, feel free to reach out!
				</p>
				<button className='btn btn-warning '>Contact Us</button>
			</div>
			<div className='container'>
				<span className='text-gray lead'>
					An Amazing <span className='text-white'>PHOTO</span> Shopping website
				</span>
			</div>
		</footer>
	</div>
);

export default Base;
