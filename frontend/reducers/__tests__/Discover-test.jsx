'use strict'

jest.unmock('../Discover.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { discoverReducer as reducer, defaultState } from '../Discover.jsx'

describe('discover reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

	it('should add song to history', () => {
		// ADD SONG TO DEFAULT STATE

		const testVar1 = { url: 'a' }
		const MASAS_songInfo1 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar1 }
		const SC_songInfo1 = { testVar1 }

		expect(
			reducer(defaultState, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo1,
				SC_songInfo: SC_songInfo1
			})
		).toEqual({
			...defaultState,
			history: {
					...defaultState.history,
					2: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1
						},
					]
				}
		})

		// ADD SONG TO ARBITRARY STATE
		const testVar2 = { url: 'b' }
		const MASAS_songInfo2 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar2 }
		const SC_songInfo2 = { testVar2 }

		const newState = {
			...defaultState,
			history: {
					...defaultState.history,
					2: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1
						},
					]
				}
		}

		expect(
			reducer(newState, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo2,
				SC_songInfo: SC_songInfo2
			})
		).toEqual({
			...defaultState,
			history: {
				...newState.history,
				2: [
					{
						MASAS_songInfo: MASAS_songInfo1,
						SC_songInfo: SC_songInfo1
					},
					{
						MASAS_songInfo: MASAS_songInfo2,
						SC_songInfo: SC_songInfo2
					},
				]
			}
		})

		// SONG DOESN'T ADD IF LATEST IN LIST
		const testVar3 = { url: 'c' }
		const MASAS_songInfo3 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar3 }
		const SC_songInfo3 = { testVar3 }

		const newState3 = {
			...defaultState,
			history: {
					...defaultState.history,
					2: [
						{
							MASAS_songInfo: MASAS_songInfo3,
							SC_songInfo: SC_songInfo3
						},
					]
				}
		}

		expect(
			reducer(newState3, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo3,
				SC_songInfo: SC_songInfo3
			})
		).toEqual({
			...newState3,
			history: {
				
				...newState3.history
			}
		})

		// BOUDNARY CONDITIONS
		let MASAS_songInfo_bis = { ...MASAS_songInfo1, timeInterval: 'http://hey.com/api/status/timeInterval/7/' }
		expect(
			reducer(newState, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo_bis,
				SC_songInfo: SC_songInfo1
			})
		).toEqual({
			...newState,
		})

		MASAS_songInfo_bis = { ...MASAS_songInfo1, timeInterval: 'http://hey.com/api/status/timeInterval/0/' }
		expect(
			reducer(newState, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo_bis,
				SC_songInfo: SC_songInfo1
			})
		).toEqual({
			...newState,
		})
	})

	it('should remove song from history', () => {
		const testVar1 = { test: 'a' }
		const MASAS_songInfo1 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', testVar1 }
		const SC_songInfo1 = { testVar1 }

		const testVar2 = { test: 'a' }
		const MASAS_songInfo2 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', testVar2 }
		const SC_songInfo2 = { testVar2 }

		const newState = {
			...defaultState,
			history: {
				...defaultState.history,
				2: [
					{
						MASAS_songInfo: MASAS_songInfo1,
						SC_songInfo: SC_songInfo1
					},
					{
						MASAS_songInfo: MASAS_songInfo2,
						SC_songInfo: SC_songInfo2
					},
				],
				1: [
					{
						MASAS_songInfo: MASAS_songInfo1,
						SC_songInfo: SC_songInfo1
					},
				]
			}
		}

		expect(
			reducer(newState, {
				type: 'POP_SONG_FROM_HISTORY',
				discoverNumber: 2
			})
		).toEqual({
			...newState,
			history: {
					...newState.history,
					2: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1
						},
					]
				}
		})

		// boundary conditions
		expect(
			reducer(newState, {
				type: 'POP_SONG_FROM_HISTORY',
				discoverNumber: 0
			})
		).toEqual(newState)

		expect(
			reducer(newState, {
				type: 'POP_SONG_FROM_HISTORY',
				discoverNumber: 7
			})
		).toEqual(newState)
		
	})

})