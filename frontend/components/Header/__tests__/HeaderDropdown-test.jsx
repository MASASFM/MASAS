'use strict'

jest.unmock('../HeaderDropdown.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import HeaderDropdown from '../HeaderDropdown.jsx'

describe('HeaderDropdown', () => {
	// Mock component so no dependence on redux state, only on prop
	const MockHeaderDropdown = class extends HeaderDropdown {
		// prevent username fetching in mock component
		componentWillMount() { 
			    return
		}
	}
	
	it('shows login from props', () => {
		const headerDropdown = TestUtils.renderIntoDocument(
			 <MockHeaderDropdown />
		)

		// check that login block rendered and the link redirects to the login page 
		expect(headerDropdown.refs.loginLink.props.to).toEqual('/login')
	})

	it('displays username from props', () => {
		const headerDropdown = TestUtils.renderIntoDocument(
			 <MockHeaderDropdown username="thomas" MASASuser="none zero to render username" />
		)

		const headerDropdownNode = ReactDOM.findDOMNode(headerDropdown)

		// Verify that the text username is correct
		expect(headerDropdownNode.children[0].children[1].textContent).toEqual('thomas')

		// Check that the login block did not render
		expect(typeof(headerDropdown.refs.loginLink) === "undefined").toEqual(true)
	})
})