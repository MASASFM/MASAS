let exportVar = {}

exportVar.defaultState = {
	progressBar: 0				// (INT) 0-100
}
const { defaultState } = exportVar

exportVar.footerReducer = function(state = defaultState, action) {
  
	switch(action.type) {
		case 'SET_PLAYER_PROGRESS_BAR': // not tested
			return {
				...state,
				progressBar: action.progress
			}
		default:
			return state
	}
}

module.exports = exportVar