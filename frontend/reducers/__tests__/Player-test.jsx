'use strict'

jest.unmock('../Player.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { playerReducer as reducer, defaultState } from '../Player.jsx'

describe('player reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

	it('should handle PLAY', () => {
		expect(
			reducer(
				defaultState,
				{
					type: 'PLAY',
				}
			)
		).toEqual({
			...defaultState,
			isPaused: false,
		})
	})

	it('should handle PAUSE', () => {
		const playerAtTime = 123

		expect(
			reducer(
				defaultState,
				{
					type: 'PAUSE',
					pausingAtTime: playerAtTime
				}
			)
		).toEqual({
			...defaultState,
			isPaused: true,
			playerAtTime
		})
	})

	it('should handle PLAY_NEW_SONG', () => {
		const song = {}

		expect(
			reducer(
				defaultState,
				{
					type: 'PLAY_NEW_SONG',
					song
				}
			)
		).toEqual({
			...defaultState,
			isPaused: false,
			songPlaying: song,
			playerAtTime: 0
		})
	})

	it('should handle UPDATE_MASAS_SONG_INFO', () => {
		const songInfo = {}

		expect(
			reducer(
				defaultState,
				{
					type: 'UPDATE_MASAS_SONG_INFO',
					songInfo
				}
			)
		).toEqual({
			...defaultState,
			MASAS_songInfo: songInfo
		})
	})

	it('should handle UPDATE_SC_SONG_INFO', () => {
		const songInfo = {}

		expect(
			reducer(
				defaultState,
				{
					type: 'UPDATE_SC_SONG_INFO',
					songInfo
				}
			)
		).toEqual({
			...defaultState,
			SC_songInfo: songInfo
		})
	}) 

	it('should handle TOGGLE_SONG_LIKE', () => {
		const songInfo = {}

		expect(
			reducer(
				defaultState,
				{
					type: 'TOGGLE_SONG_LIKE',
				}
			)
		).toEqual({
			...defaultState,
			isSongPlayingLiked: !defaultState.isSongPlayingLiked
		})
	})

	it('should handle LIKE_SONG', () => {
		const songInfo = {}

		expect(
			reducer(
				defaultState,
				{
					type: 'LIKE_SONG',
				}
			)
		).toEqual({
			...defaultState,
			isSongPlayingLiked: true
		})
	})

	it('should handle UNLIKE_SONG', () => {
		const songInfo = {}

		expect(
			reducer(
				{
					...defaultState,
					isSongPlayingLiked: true
				},
				{
					type: 'UNLIKE_SONG',
				}
			)
		).toEqual({
			...defaultState,
			isSongPlayingLiked: false
		})
	})

	
})