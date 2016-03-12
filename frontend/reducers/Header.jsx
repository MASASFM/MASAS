let exportVar = {}

exportVar.defaultState = {
	username: null			// username shown in header dropdown
}
const{ defaultState } = exportVar

exportVar.headerReducer = function(state = defaultState, action) {
  
	switch(action.type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: action.username
			}
		default:
			return state
	}
}


module.exports = exportVar