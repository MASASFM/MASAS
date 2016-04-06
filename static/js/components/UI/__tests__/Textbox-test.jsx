'use strict'

jest.unmock('../Textbox.jsx')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Textbox from '../Textbox.jsx';

describe('Textbox', () => {
	it('has correct label', () => {
		const textbox = TestUtils.renderIntoDocument(
			 <Textbox>test</Textbox>
		)

		const textboxNode = ReactDOM.findDOMNode(textbox)

		//<Textbox id="login-password-input" labelError="Textbox invalid" error={false}>Please enter your password</Textbox>

		// Verify label content
		expect(textboxNode.children[0].children[0].textContent).toEqual('test')
	})

	it('is not in error state', () => {
		// Render a like
		const textbox = TestUtils.renderIntoDocument(
			 <Textbox labelError="textbox error" error={false}>test</Textbox>
		)

		const textboxNode = ReactDOM.findDOMNode(textbox)

		//<Textbox id="login-password-input" labelError="Textbox invalid" error={false}>Please enter your password</Textbox>

		// Verify that the label is colored properly
		expect(textboxNode.children[0].className).toEqual('wrapper')
		// Verify that the label has correct text
		expect(textboxNode.children[0].children[0].textContent).toEqual('test')
	})

	it('is in error state', () => {
		// Render a like
		const textbox = TestUtils.renderIntoDocument(
			 <Textbox labelError="textbox error" error={true}>test</Textbox>
		)

		const textboxNode = ReactDOM.findDOMNode(textbox)

		//<Textbox id="login-password-input" labelError="Textbox invalid" error={false}>Please enter your password</Textbox>

		// Verify that the label is colored properly
		expect(textboxNode.children[0].className).toEqual('wrapper error')
		// Verify that the label has correct text
		expect(textboxNode.children[0].children[0].textContent).toEqual('textbox error')
	})
})