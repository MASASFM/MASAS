'use strict'

jest.unmock('../Header.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { headerReducer as reducer, defaultState } from '../Header.jsx'

describe('header reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

	it('should handle SET_USERNAME', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'SET_USERNAME',
					username: 'test username'
				}
			)
		).toEqual(
			{
				...defaultState,
				username: 'test username'
			}
		)
	})



})