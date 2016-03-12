'use strict'

jest.unmock('../Button.jsx')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Button from '../Button.jsx';

describe('Button', () => {
	it('has correct text', () => {
		// Render a button with capitals
		const button = TestUtils.renderIntoDocument(
			 <Button caps={true}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the text is correct
		expect(buttonNode.children[0].textContent).toEqual('hello')
	})

	it('has text in caps', () => {
		// Render a button with capitals
		const button = TestUtils.renderIntoDocument(
			 <Button caps={true}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the text is in uppercase
		expect(buttonNode.children[0].style.textTransform).toEqual('uppercase')
	})

	it('has text in not caps', () => {
		// Render a button without capitals
		const button = TestUtils.renderIntoDocument(
			<Button caps={false}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the text is w/o caps
		expect(buttonNode.children[0].style.textTransform).toEqual('none')
	})

	it('is a white button', () => {
		// Render a white button
		const button = TestUtils.renderIntoDocument(
			<Button white={true}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the button is white
		expect(buttonNode.className).toEqual('MASAS-button white ')	// trailling space necessary
	})

	it('is not a white button', () => {
		// Render a not white buton
		const button = TestUtils.renderIntoDocument(
			  <Button white={false}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the button is not white
		expect(buttonNode.className).toEqual('MASAS-button')
	})
})