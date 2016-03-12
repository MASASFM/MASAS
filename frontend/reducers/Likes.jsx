let exportVar = {}

exportVar.defaultState = {
	userLikes: null,						// user likes from MASAS API
	SCinfo: null,						// song info corresponding to these likes from SCinfo
}
const { defaultState } = exportVar

exportVar.likesReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'UPDATE_LIKES':
			return {
				...state,
				SCinfo: action.SCinfo,
				userLikes: action.userLikes,
			};
		// SCinfo updated from likes page renderLikes() method
		case 'ADD_LIKE':
			return {
				...state,
				userLikes: action.userLikes,
			};

		default:
			return state;
	}
}


module.exports = exportVar