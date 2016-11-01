import 'whatwg-fetch'

// var { isObjectEmpty } = require("../../MASAS_functions.jsx")
const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

export const UPDATE_USER_SC_SONGS = 'UPDATE_USER_SC_SONGS'
export const UPDATE_PUBLIC_PROFILE_INFO = 'UPDATE_PUBLIC_PROFILE_INFO'
export const TOGGLE_EDITING_PROFILE = 'TOOGLE_EDITING_PROFILE'
export const UPDATE_EDIT_PROFILE_TEXTBOX_VALUES = 'UPDATE_EDIT_PROFILE_TEXTBOX_VALUES'
export const UPDATE_SONG_MOOD_MODAL_VALUE = 'UPDATE_SONG_MOOD_MODAL_VALUE'

export function toggleEditingProfile() {
	return {
		type: TOGGLE_EDITING_PROFILE,
	}
}

export function updatePublicProfileInfo(publicProfileInfo) {
	return {
		type: "UPDATE_PUBLIC_PROFILE_INFO",
		publicProfileInfo
	}
}

export function updateUserSCSongs(userSCSongs) {
	return {
		type:'UPDATE_USER_SC_SONGS',
		userSCSongs,
	}
}

export function getSCinfo() {
	return (dispatch, getState) => {
		const state = getState()
		const { publicProfileInfo } = state.profileReducer
		const { userData } = state.appReducer

		var songs = {}

		if(isObjectEmpty(publicProfileInfo))
			songs = userData.songs
		else
			songs = publicProfileInfo.songs

		if(typeof(songs) !== "undefined") {
			var idString = songs.map( song => song.SC_ID ).join()

			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				dispatch(updateUserSCSongs(response))
			})
		}
	}	
}


// (int) userPk : user pk
export function getPublicProfileInfo(userPk) {
	return dispatch => fetch("/api/users/" + userPk + "/")
			.then( resp => resp.json() )
			.then( resp => { 
				dispatch( updatePublicProfileInfo(resp) )
				dispatch( getSCinfo() )
			} )
}

export function updateProfileInfo(callback) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser, userData } = state.appReducer

		var headers = new Headers()
		headers.append("Authorization", "Bearer " + MASASuser)

		fetch(userData.url, { headers })
		.then( userData => {
			dispatch({ type: 'UPDATE_USER_DATA', userData })
			if(callback)
				callback()
		})
	}
}