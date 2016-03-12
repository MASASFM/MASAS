'use strict'

jest.unmock('../App.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { appReducer as reducer, defaultState } from '../App.jsx'

describe('app reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})
	
	it('should handle LOGIN', () => {
		expect(
			reducer(undefined, {
				type: 'LOGIN',
				token: 'ABC'
			})
		).toEqual(
			{
				...defaultState,
				MASASuser: 'ABC', 	
				MASASuserPk: null, 	
			}
		)
	})

	it('should handle LOGOUT', () => {
		expect(
			reducer(
				{
					...defaultState,
					MASASuser: 'ABC', 	
					MASASuserPk: 4, 	
				}, 
				{
					type: 'LOGOUT',
					token: 'ABC'
				}
			)
		).toEqual(
			{
				...defaultState,
				MASASuser: null, 	
				MASASuserPk: null, 	
			}
		)
	})

	it('should handle UPDATE_PAGE_TITLE', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'UPDATE_PAGE_TITLE',
					title: 'test title',
					pageType: 1
				}
			)
		).toEqual(
			{
				...defaultState,
				pageTitle: 'test title', 
				pageType: 1,		
			}
		)

		expect(
			reducer(
				defaultState, 
				{
					type: 'UPDATE_PAGE_TITLE',
					title: 'test title',
					pageType: 2
				}
			)
		).toEqual(
			{
				...defaultState,
				pageTitle: 'test title', 
				pageType: 0,		
			}
		)

		expect(
			reducer(
				defaultState, 
				{
					type: 'UPDATE_PAGE_TITLE',
					title: 'test title',
					pageType: 'hey'
				}
			)
		).toEqual(
			{
				...defaultState,
				pageTitle: 'test title', 
				pageType: 0,		
			}
		)

		expect(
			reducer(
				{
					...defaultState, 
					pageType: 1
				},
				{
					type: 'UPDATE_PAGE_TITLE',
					title: 'test title',
					pageType: 0
				}
			)
		).toEqual(
			{
				...defaultState,
				pageTitle: 'test title', 
				pageType: 0,		
			}
		)
	})

	it('should handle TOOGLE_NAV_SIDEBAR', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'TOOGLE_NAV_SIDEBAR'
				}
			)
		).toEqual(
			{
				...defaultState,
				navSiderbarOpen: !defaultState.navSiderbarOpen
			}
		)
	})

	it('should handle UPDATE_USER_PK', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'UPDATE_USER_PK',
					pk: 'ABC'
				}
			)
		).toEqual(
			{
				...defaultState,
				MASASuserPk: 'ABC'
			}
		)
	})

	it('should handle DONE_PROCESSING_AUTH_COOKIE', () => {
		expect(
			reducer(
				defaultState, 
				{
					type: 'DONE_PROCESSING_AUTH_COOKIE',
				}
			)
		).toEqual(
			{
				...defaultState,
				processingAuthCookie: false
			}
		)
	})

})