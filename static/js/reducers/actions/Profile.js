import "whatwg-fetch"

import { 
	updateNotificationBar
} from "./Header.js"

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
		.then( r => r.json() )
		.then( userData => {
			dispatch({ type: 'UPDATE_USER_DATA', userData })
			if(callback)
				callback()
		})
	}
}



export function saveProfile(getCookie) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser, userData } = state.appReducer
		const userToken = MASASuser
		var textboxValues = { ...state.profileReducer.textboxValues }
		delete textboxValues.link_set
		// textboxValues.city = textboxValues.city

		const header = "Bearer " + userToken
		var csrftoken = getCookie("csrftoken")

		// counter used to know how many ajax calls are made
		var counterTotal = 1
		var counterSuccess = 0

		////////// UPDATE PROFILE PART I (everything but links)
		fetch(userData.url, {
			method: "PATCH",
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken,
				"content-type": "application/json"
			},
			// contentType: "application/json",
			body: JSON.stringify(textboxValues), 
		}).then( r => {
			counterSuccess = counterSuccess + 1

			if(counterSuccess === counterTotal) {
				dispatch(updateProfileInfo())
				dispatch(updateNotificationBar('Profile updated !'))
				dispatch(toggleEditingProfile())
			}
		}).catch( e => {
			dispatch(updateNotificationBar("Error updating profile..."))
		})

		////////// UPDATE PROFILE LINKS
		textboxValues = { ...state.profileReducer.textboxValues }

		// link user entered doesn't exist, we create it
		textboxValues.link_set.map( textboxLink => {
			var match = userData.link_set.filter( userLink => {
				return textboxLink === userLink.link
			})

			// new link => POST
			if(match.length === 0 && textboxLink !== "") {
				counterTotal = counterTotal + 1

				fetch("/api/links/", {
					method: "POST",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken,
						"content-type": "application/json",
					},
					body: JSON.stringify({
						link: textboxLink,
						user: userData.url
					}),
				}).then( r => {
					counterSuccess = counterSuccess + 1

					if(counterSuccess === counterTotal) {
						dispatch(updateProfileInfo())
						dispatch(updateNotificationBar('Profile updated !'))
						dispatch(toggleEditingProfile())
					}
				}).catch( e => {
					dispatch(updateNotificationBar("Error updating profile..."))
				})
			}
		})

		// link user has in DB isn't in textboxes user has entered, we delete link in DB
		userData.link_set.map((userLink) => {
			var match = textboxValues.link_set.filter((textboxLink) => {
				return userLink.link === textboxLink
			})

			// new link => DELETE
			if(match.length === 0) {
				counterTotal = counterTotal + 1

				fetch(userLink.url, {
					method: "DELETE",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken
					}
				}).then( r => {
					counterSuccess = counterSuccess + 1

					if(counterSuccess === counterTotal) {
						dispatch(updateProfileInfo())
						dispatch(updateNotificationBar('Profile updated !'))
						dispatch(toggleEditingProfile())
					}
				}).catch( e => {
					dispatch(updateNotificationBar("Error updating profile..."))
				})
			}
		})
	}
}



