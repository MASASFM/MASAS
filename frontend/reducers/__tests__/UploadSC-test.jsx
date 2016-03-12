'use strict'

jest.unmock('../UploadSC.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { uploadSCReducer as reducer, defaultState } from '../UploadSC.jsx'

describe('upload SC reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

	it('should handle SYNC_SONG', () => {
		const song = {}

		expect(
			reducer(
				defaultState,
				{
					type: 'SYNC_SONG',
					song
				}
			)
		).toEqual({
			...defaultState,
			choosingTime: song
		})
	})

})