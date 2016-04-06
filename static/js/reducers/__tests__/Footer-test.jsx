'use strict'

jest.unmock('../Footer.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { footerReducer as reducer, defaultState } from '../Footer.jsx'

describe('footer reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})
	
})