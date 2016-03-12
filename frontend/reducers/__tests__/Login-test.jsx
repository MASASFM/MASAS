'use strict'

jest.unmock('../Login.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { loginReducer as reducer, defaultState } from '../Login.jsx'

describe('login reducer', () => {
	const defaultState = {}

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})
	
})