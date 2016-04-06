'use strict'

jest.unmock('../Likes.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { likesReducer as reducer, defaultState } from '../Likes.jsx'

describe('likes reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

	it('should handle UPDATE_LIKES ', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'UPDATE_LIKES',
					SCinfo: {a: 'a', b: 'b'},
					userLikes: {A: 'A', B: 'B'},
				}
			)
		).toEqual(
			{
				...defaultState,
				SCinfo: {a: 'a', b: 'b'},
				userLikes: {A: 'A', B: 'B'}
			}
		)
	})

	it('should handle ADD_LIKE ', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'ADD_LIKE',
					userLikes: {A: 'A', B: 'B'},
				}
			)
		).toEqual(
			{
				...defaultState,
				userLikes: {A: 'A', B: 'B'}
			}
		)
	})

})