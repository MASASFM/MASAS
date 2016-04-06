'use strict'

jest.unmock('../App.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import App from '../App.jsx'

describe('App', () => {

	// Mock component so no dependence on redux state, only on prop
	const MockApp = class extends App {
		// prevent username fetching in mock component
		componentWillMount() { 
			    return
		}
	}
	
	it('show renders app based on processingAuthCookie prop', () => {

		let app = TestUtils.renderIntoDocument(
			 <MockApp processingAuthCookie={false} />
		)

		let node = ReactDOM.findDOMNode(app)
		expect(node.textContent).toEqual('sidebar')

		app = TestUtils.renderIntoDocument(
			 <MockApp processingAuthCookie={true} />
		)

		node = ReactDOM.findDOMNode(app)
		expect(node.textContent).toEqual('LOADING')
	})

})