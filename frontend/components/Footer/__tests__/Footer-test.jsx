'use strict'


jest.unmock('../Footer.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Footer from '../Footer.jsx'


describe('Body', () => {
	
	it('renders the player', () => {
		const body = TestUtils.renderIntoDocument(
			 <Footer />
		)

		const DOMNode = ReactDOM.findDOMNode(body)
		expect(DOMNode.children[0].textContent).toEqual('foo')
	})

})