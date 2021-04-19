/** @format */

import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base';
import {
	getCategories,
	getProduct,
	updateProduct,
} from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';

const UpdateProduct = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		error: '',
		createdProduct: '',
		getRedirect: false,
		loading: false,
		formData: '',
	});

	const {
		name,
		description,
		error,
		price,
		stock,
		categories,
		category,
		loading,
		createdProduct,
		getRedirect,
		formData,
	} = values;

	const preload = (productId) => {
		getProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues(
					{
						...values,
						name: data.name,
						description: data.description,
						price: data.price,
						category: data.category._id,
						stock: data.stock,
						formData: new FormData(),
					},
					preloadCategories()
				);
			}
		});
	};

	const preloadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ categories: data, formData: new FormData() });
			}
		});
	};

	useEffect(() => {
		preload(match.params.productId);
	}, []);

	//TODO: work on it
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: '', loading: true, getRedirect: true });

		updateProduct(match.params.productId, user._id, token, formData).then(
			(data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					setValues({
						...values,
						name: '',
						description: '',
						price: '',
						photo: '',
						stock: '',
						loading: false,
						createdProduct: data.name,
					});
				}
			}
		);
	};

	const performRedirect = () => {
		if (getRedirect) {
			return <Redirect to='/admin/products' />;
		}
	};

	const successMessage = () => (
		<div
			className='alert alert-success mt-3'
			style={{ display: createdProduct ? '' : 'none' }}>
			<h4>{createdProduct} created Updated</h4>
		</div>
	);

	const warningMessage = () => {
		<div
			className='alert alert-info, mt-3'
			style={{ display: error ? '' : 'none' }}>
			<h4>Sorry some thing went wrong </h4>
		</div>;
	};

	const handleChange = (name) => (event) => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const createProductForm = () => (
		<form className='mt-2'>
			<span>Post photo</span>
			<div className='form-group'>
				<label className='btn btn-block btn-primary mb-2 '>
					<input
						onChange={handleChange('photo')}
						type='file'
						name='photo'
						accept='image'
						placeholder='choose a file'
					/>
				</label>
			</div>
			<div className='form-group mb-2'>
				<input
					onChange={handleChange('name')}
					name='photo'
					className='form-control'
					placeholder='Name'
					value={name}
				/>
			</div>
			<div className='form-group mb-2'>
				<textarea
					onChange={handleChange('description')}
					name='photo'
					className='form-control'
					placeholder='Description'
					value={description}
				/>
			</div>
			<div className='form-group mb-2'>
				<input
					onChange={handleChange('price')}
					type='number'
					className='form-control'
					placeholder='Price'
					value={price}
				/>
			</div>
			<div className='form-group mb-2'>
				<select
					onChange={handleChange('category')}
					className='form-control'
					placeholder='Category'>
					<option>Select</option>
					{categories &&
						categories.map((cate, index) => {
							return (
								<option key={index} value={cate._id}>
									{cate.name}
								</option>
							);
						})}
				</select>
			</div>
			<div className='form-group mb-2'>
				<input
					onChange={handleChange('stock')}
					type='number'
					className='form-control'
					placeholder='Quantity'
					value={stock}
				/>
			</div>

			<button
				type='submit'
				onClick={onSubmit}
				className='btn btn-outline-info mb-3'>
				Update Product
			</button>
		</form>
	);

	return (
		<Base
			title='Add Product !'
			description='Welcome to product creation area'
			className='container bg-info  p-4'>
			<Link to='/admin/dashboard' className='btn btn-md btn-secondary mb-3'>
				Dashboard
			</Link>
			<div className='row bg-white text-secondary rounded'>
				<div className=' col-md-8 offset-md-2'>
					{successMessage()}
					{warningMessage()}
					{createProductForm()}
					{performRedirect()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateProduct;
