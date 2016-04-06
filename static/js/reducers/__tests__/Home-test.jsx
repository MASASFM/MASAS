'use strict'

jest.unmock('../Home.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { homeReducer as reducer, defaultState } from '../Home.jsx'

describe('home reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

})