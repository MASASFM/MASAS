'use strict'

jest.unmock('../Password.jsx')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Password from '../Password.jsx';

describe('Password', () => {
	it('has correct label', () => {
		const password = TestUtils.renderIntoDocument(
			 <Password>test</Password>
		)

		const passwordNode = ReactDOM.findDOMNode(password)

		//<Password id="login-password-input" labelError="Password invalid" error={false}>Please enter your password</Password>

		// Verify label content
		expect(passwordNode.children[0].children[0].textContent).toEqual('test')
	})

	it('is not in error state', () => {
		// Render a like
		const password = TestUtils.renderIntoDocument(
			 <Password labelError="password error" error={false}>test</Password>
		)

		const passwordNode = ReactDOM.findDOMNode(password)

		//<Password id="login-password-input" labelError="Password invalid" error={false}>Please enter your password</Password>

		// Verify that the label is colored properly
		expect(passwordNode.children[0].className).toEqual('wrapper')
		// Verify that the label has correct text
		expect(passwordNode.children[0].children[0].textContent).toEqual('test')
	})

	it('is in error state', () => {
		// Render a like
		const password = TestUtils.renderIntoDocument(
			 <Password labelError="password error" error={true}>test</Password>
		)

		const passwordNode = ReactDOM.findDOMNode(password)

		//<Password id="login-password-input" labelError="Password invalid" error={false}>Please enter your password</Password>

		// Verify that the label is colored properly
		expect(passwordNode.children[0].className).toEqual('wrapper error ')
		// Verify that the label has correct text
		expect(passwordNode.children[0].children[0].textContent).toEqual('password error')
	})
})