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

function updateLikes(SCinfo, MASASinfo) {
	const userLikes =  SCinfo.map( song => { 
		var MASAS_songInfo = MASASinfo.filter( like => like.song.SC_ID === song.id )

		if(MASAS_songInfo.length === 1)
			return {
				SC_songInfo: song,
				MASAS_songInfo: MASAS_songInfo[0],
				showProfile: false,
			}
		else
			return		
	})

	console.log(userLikes)

	return {
		type: UPDATE_LIKES,
		SCinfo, 
		userLikes,
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
				dispatch(updateLikes(response, userData.likes))
			})
		} else {
			dispatch( updateLikes( [] ) )
		}
	}
}