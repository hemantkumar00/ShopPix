/** @format */

import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

const Signin = () => {
	const [values, setValues] = useState({
		email: 'hello@hi.com',
		password: '1234',
		error: '',
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							email: '',
							password: '',
							didRedirect: true,
						});
					});
				}
			})
			.catch((err) => console.error(err));
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to='/admin/dashboard' />;
			} else {
				return <Redirect to='/' />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className='alert alert-primary col-md-6 offset-sm-3 text-left'>
					Be patient we are authenticating...
				</div>
			)
		);
	};

	const errorMessage = () => {
		return (
			<div
				className='alert alert-danger col-md-6 offset-sm-3 text-left'
				style={{ display: error ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	const signInForm = () => {
		return (
			<div className='row'>
				<div className='col-6 offset-sm-3 text-left'>
					<form>
						<div className='form-group'>
							<label className='text-gray'>Email</label>
							<input
								className='form-control'
								onChange={handleChange('email')}
								value={email}
								type='email'
							/>
						</div>
						<div className='form-group'>
							<label className='text-gray'>Password</label>
							<input
								className='form-control'
								value={password}
								onChange={handleChange('password')}
								type='password'
							/>
						</div>
						<div className='d-grid gap-2 col-6 mx-auto p-4'>
							<button
								onClick={onSubmit}
								className='btn btn-primary btn-block rounded-3'>
								Signin
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	};

	return (
		<Base title='Sign in!' description='Plz signin and enjoy shopping'>
			{loadingMessage()}
			{errorMessage()}
			{signInForm()}
			{performRedirect()}
			{/* <p className=' text-primary text-center'>{JSON.stringify(values)}</p> */}
		</Base>
	);
};

export default Signin;
