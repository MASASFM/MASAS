const apiRoot = 'http://masas.fm//'

export const REQUEST_LIKES = 'REQUEST_LIKES'
function requestLikes() {
	return {
		type: REQUEST_LIKES
	}
}

export const UPDATE_LIKES = 'UPDATE_LIKES'
function updateLikesOld(SCinfo) {
	return {
		type: UPDATE_LIKES,
		SCinfo, 
		userLikes: null
	}
}

export const UPDATE_MINI_PROFILE = 'UPDATE_LIKE_ARTWORK_MINI_PROFILE'
function updateMiniProfile(songPk, artistInfo) {
	return {
		type: UPDATE_MINI_PROFILE,
		songPk,
		artistInfo
	}
}

function fetchMiniProfile(MASAS_songInfo) {
	return dispatch => fetch(MASAS_songInfo.user)
			.then( resp => resp.json() )
			.then( resp => dispatch( updateMiniProfile(MASAS_songInfo.pk, resp)) )
}

function updateLikes(dispatch, SCinfo, MASASinfo) {
	const userLikes =  SCinfo.map( song => { 
		var MASAS_songInfo = MASASinfo.filter( like => like.song.SC_ID === song.id )

		if(MASAS_songInfo.length === 1) {
			dispatch(fetchMiniProfile(MASAS_songInfo[0]))
			return {
				SC_songInfo: song,
				MASAS_songInfo: MASAS_songInfo[0],
				showProfile: false,
				artistInfo: null,
			}
		} else
			return		
	})

	return {
		type: UPDATE_LIKES,
		SCinfo, 
		userLikes,
	}
}

export const TOGGLE_MINI_PROFILE = 'TOGGLE_LIKE_ARTWORK_MINI_PROFILE'
export function toogleMiniProfile(MASAS_songPk) {
	return {
		type: TOGGLE_MINI_PROFILE,
		songPk: MASAS_songPk,
	}
}

export function fetchLikes() {
	return (dispatch, getState) => {
		const state = getState()
		const { userData } = state.appReducer

		if(typeof(userData.likes) !== "undefined") {
			var idString = userData.likes.map( like => like.song.SC_ID ).join()
			SC.get("tracks", {limit: userData.likes.length, ids: idString})
			.then( response => {
				dispatch(updateLikesOld(response))
				dispatch(updateLikes(dispatch, response, userData.likes))
			})
		} else {
			dispatch( updateLikes( dispatch, [], [] ) )
		}
	}
}