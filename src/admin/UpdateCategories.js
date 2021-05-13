/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { updateCategory, getCategory } from './helper/adminapicall';

const AddCategory = ({ match }) => {
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const preload = (categoryId) => {
		getCategory(categoryId).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setName(data.name);
			}
		});
	};

	useEffect(() => {
		preload(match.params.categoryId);
	}, []);

	const goBack = () => (
		<div className='mt-5'>
			<Link
				className='btn btn-small btn-secondary text-white mb-3'
				to='/admin/dashboard'>
				DashBoard
			</Link>
		</div>
	);

	const handleChange = (event) => {
		setError('');
		setName(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setError('');
		setSuccess(false);

		//backend request fired
		updateCategory(user._id, token, { name }, match.params.categoryId).then(
			(data) => {
				if (data.error) {
					setError(true);
				} else {
					setError(false);
					setSuccess(true);
					setName('');
				}
			}
		);
	};

	const successMessage = () => {
		if (success) {
			return <h4 className='text-info'>Category created successfully</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4 className='text-warning'>Failed to create category</h4>;
		}
	};

	const myCategoryForm = () => (
		<form>
			<div className='form-group '>
				<p className='lead'>Enter the category</p>
				<input
					type='text'
					className='form-control my-3'
					autoFocus
					required
					value={name}
					onChange={handleChange}
					placeholder='Ex: Vintage'
				/>
				<button onClick={onSubmit} className='btn btn-outline-info'>
					Update Category
				</button>
			</div>
		</form>
	);

	return (
		<Base
			title='Create a Category'
			description='Add a new category for PHOTO'
			className='container bg-info p-4'>
			<div className='row bg-white rounded'>
				<div className='col-8 offset-md-2 text-secondary'>
					{successMessage()}
					{warningMessage()}
					{myCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
