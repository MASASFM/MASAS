'use strict'


jest.unmock('../Body.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Body from '../Body.jsx'


describe('Body', () => {
	
	it('has correct title', () => {
		const body = TestUtils.renderIntoDocument(
			 <Body title='foo' />
		)

		// expect(body.refs.titleTest.textContent).toEqual('test title')
		const DOMNode = ReactDOM.findDOMNode(body)
		expect(DOMNode.children[0].textContent).toEqual('foo')
	})

	it('renders Home component', () => {
		const body = TestUtils.renderIntoDocument(
			 <Body title='test title' />
		)

		const DOMNode = ReactDOM.findDOMNode(body)
		expect(DOMNode.children[2].textContent).toEqual('home')
	})

	it('renders content prop', () => {
		const body = TestUtils.renderIntoDocument(
			 <Body title='test title' content={<div>foo</div>} />
		)

		const DOMNode = ReactDOM.findDOMNode(body)
		expect(DOMNode.children[2].textContent).toEqual('foo')
	})

})