/** @format */

import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
	const imageUrl = product
		? `${API}/product/photo/${product._id}`
		: 'https://images.pexels.com/photos/5054776/pexels-photo-5054776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
	return (
		// eslint-disable-next-line jsx-a11y/img-redundant-alt
		<img
			src={imageUrl}
			alt='photo'
			style={{ maxHeight: '100%', maxWidth: '100%' }}
			className='mb-3 rounded'
		/>
	);
};

export default ImageHelper;
