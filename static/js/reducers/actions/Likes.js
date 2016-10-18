const apiRoot = 'http://masas.fm/'

export const REQUEST_LIKES = 'REQUEST_LIKES'
function requestLikes() {
	return {
		type: REQUEST_LIKES
	}
}

export const UPDATE_LIKES = 'UPDATE_LIKES'
function updateLikes(SCinfo) {
	return {
		type: UPDATE_LIKES,
		SCinfo, 
		userLikes: null
	}
}


export function fetchLikes() {
	return (dispatch, getState) => {
		const state = getState()
		console.log(state)
		const { userData } = state.appReducer

		if(typeof(userData.likes) !== "undefined") {
			var idString = userData.likes.map( like => like.song.SC_ID ).join()
			SC.get("tracks", {limit: userData.likes.length, ids: idString})
			.then( response => dispatch(updateLikes(response)) )
		} else {
			dispatch( updateLikes( [] ) )
		}
	}
}