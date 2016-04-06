'use strict'

jest.unmock('../Body.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { bodyReducer as reducer, defaultState } from '../Body.jsx'

describe('body reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

})