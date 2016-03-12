'use strict'

jest.unmock('../Profile.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { profileReducer as reducer, defaultState } from '../Profile.jsx'

describe('profile reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

})