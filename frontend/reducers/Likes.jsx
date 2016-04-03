let exportVar = {}

exportVar.defaultState = {
	userLikes: null,						// user likes from MASAS API
	SCinfo: null,						// song info corresponding to these likes from SCinfo
	reFetch: 0,						// rerender when new likes come in
}
const { defaultState } = exportVar

exportVar.likesReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'UPDATE_LIKES':
			return {
				...state,
				SCinfo: action.SCinfo,
				userLikes: action.userLikes,
			}
		// SCinfo updated from likes page renderLikes() method
		case 'ADD_LIKE':
			return {
				...state,
				userLikes: action.userLikes,
			}
		case 'REFETCH_LIKES': // NOT TESTED
			return {
				...state,
				reFetch: ( state.reFetch > 100 ? 1 : state.reFetch+1 ),
			}

		default:
			return state
	}
}


module.exports = exportVar