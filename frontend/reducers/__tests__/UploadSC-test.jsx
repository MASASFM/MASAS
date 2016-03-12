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

	it('should handle UPDATE_SC_USER_TRACKS', () => {
		const soundcloudUserTracks = {foo: 'bar'}

		expect(
			reducer(
				defaultState,
				{
					type: 'UPDATE_SC_USER_TRACKS',
					soundcloudUserTracks
				}
			)
		).toEqual({
			...defaultState,
			soundcloudUserTracks
		})
	})

	it('should handle UPDATE_MASAS_USER_TRACKS', () => {
		const masasUserTracks = {foo: 'bar'}

		expect(
			reducer(
				defaultState,
				{
					type: 'UPDATE_MASAS_USER_TRACKS',
					masasUserTracks
				}
			)
		).toEqual({
			...defaultState,
			masasUserTracks
		})
	})

	it('should handle UPDATE_SC_USERNAME', () => {
		const SCusername = "foo"

		expect(
			reducer(
				defaultState,
				{
					type: 'UPDATE_SC_USERNAME',
					SCusername
				}
			)
		).toEqual({
			...defaultState,
			SCusername
		})
	})

	it('should handle UPDATE_IS_CONNECTED_SC', () => {
		const isConnectedSoundcloud = true

		expect(
			reducer(
				defaultState,
				{
					type: 'UPDATE_IS_CONNECTED_SC',
					isConnectedSoundcloud
				}
			)
		).toEqual({
			...defaultState,
			isConnectedSoundcloud
		})
	})
})