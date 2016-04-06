'use strict'

jest.unmock('../Link.jsx')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Link from '../Link.jsx';

describe('Link', () => {
	it('has correct text', () => {
		// Render a like
		const link = TestUtils.renderIntoDocument(
			 <Link>test</Link>
		)

		const linkNode = ReactDOM.findDOMNode(link)

		// Verify that the text is correct
		expect(linkNode.children[0].textContent).toEqual('test')
	})

	it('is disabled', () => {
		// Render a disabled link
		const link = TestUtils.renderIntoDocument(
			 <Link disabled={true}>test</Link>
		)

		const linkNode = ReactDOM.findDOMNode(link)

		expect(linkNode.children[0].className).toEqual('MASAS-link  disabled')		// double space necessary
	})

	it('is not disabled', () => {
		// Render an enabled link
		const link = TestUtils.renderIntoDocument(
			 <Link disabled={false}>test</Link>
		)

		const linkNode = ReactDOM.findDOMNode(link)

		expect(linkNode.children[0].className).toEqual('MASAS-link ')			// trailing single space necessary
	})

	it('has correct className', () => {
		// Render an enabled link
		const link = TestUtils.renderIntoDocument(
			 <Link className=" A B C ">test</Link>
		)

		const linkNode = ReactDOM.findDOMNode(link)

		expect(linkNode.children[0].className).toEqual('MASAS-link  A B C ')			// double space necessary
	})
})