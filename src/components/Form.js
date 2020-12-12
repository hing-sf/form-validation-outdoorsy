import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Message from './Message';
class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			isEmailValid: null,
			name: '',
			isNameValid: null,
			phone: '',
			isPhoneValid: null,
			url: '',
			isUrlValid: null
		};
	}

	handleInput = (type, value) => {
		this.setState({
			[type]: value
		});
	};

	validateFields = () => {
		const { email, url, name, phone } = this.state;
		const emailAddressRegex = /^[\w-+.]+@([\w-]+\.)+[\w-]{2,4}$/;
		const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
		const phoneRegex = /^[2-9]{10}/;

		let errorStatus = {
			email,
			url,
			name,
			phone
		};

		for (const el of ['email', 'url', 'name', 'phone']) {
			console.log('el', el);

			switch (el) {
				case 'email':
					errorStatus[el] = emailAddressRegex.test(email);
					break;
				case 'phone':
					errorStatus[el] = phoneRegex.test(phone);
					break;
				case 'url':
					errorStatus[el] = urlRegex.test(url);
					break;
				case 'name':
					errorStatus[el] = name.length >= 3;
					break;
				default:
					break;
			}
		}

		this.setState({
			isEmailValid: errorStatus.email,
			isNameValid: errorStatus.name,
			isPhoneValid: errorStatus.phone,
			isUrlValid: errorStatus.url
		});
		console.log('errorStatus', errorStatus);
	};

	render() {
		const {
			isEmailValid,
			isNameValid,
			isPhoneValid,
			isUrlValid,
			email,
			name,
			phone,
			url
		} = this.state;

		return (
			<div className='row'>
				<h1 className='text-center'>Form Validation</h1>
				<form>
					<h3>Name:</h3>
					<input
						type='text'
						value={name.value}
						onChange={e => this.handleInput('name', e.target.value)}
					/>
					{isNameValid !== null && !isNameValid && <Message msg='invalide Name Format' />}
					<h3>Email:</h3>
					<input
						type='email'
						value={email.value}
						onChange={e => this.handleInput('email', e.target.value)}
					/>
					{isEmailValid !== null && !isEmailValid && <Message msg='invalide Email Format' />}
					<h3>Phone:</h3>
					<input
						type='number'
						value={phone.value}
						onChange={e => this.handleInput('phone', e.target.value)}
					/>
					{isPhoneValid !== null && !isPhoneValid && <Message msg='invalide phone Format' />}
					<h3>Blog URL:</h3>
					<input
						type='text'
						value={url.value}
						onChange={e => this.handleInput('url', e.target.value)}
					/>
					{isUrlValid !== null && !isUrlValid && <Message msg='invalide url Format' />}
					<div className='small-6 small-centered text-center columns'>
						<a
							onClick={this.validateFields}
							href='#'
							className='button success expand round text-center'
						>
							Verify
						</a>
					</div>
				</form>
			</div>
		);
	}
}

export default Form;
