const apiRoot = 'http://masas.fm/'

export const REQUEST_LIKES = 'REQUEST_LIKES'
function requestLikes() {
	return {
		type: REQUEST_LIKES
	}
}

export const RECEIVE_LIKES = 'RECEIVE_LIKES'
function receiveLikes(json) {
	return {
		type: RECEIVE_LIKES,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	}
}

export function fetchLikes() {
	return dispatch => {
		dispatch(requestLikes())
		return fetch(apiRoot + "get-likes")
		.then(response => response.json())
		.then(json => dispatch(receiveLikes(json)))
	}
}