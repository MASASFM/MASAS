let exportVar = {}

exportVar.defaultState = {
	progressBar: 0,				// (INT) 0-100, song progress time bar
	isOpened: false,				// (BOOL), is footer opened
	suggestNewTime: 1,				// (INT) 1-6, time interval recommanded by user to uploader's song
}
const { defaultState } = exportVar

exportVar.footerReducer = function(state = defaultState, action) {
  
	switch(action.type) {
		case 'SET_PLAYER_PROGRESS_BAR': // not tested
			return {
				...state,
				progressBar: action.progress
			}
		case 'TOOGLE_IS_FOOTER_OPENED': // not tested
			console.log('hey')
			return {
				...state,
				isOpened: !state.isOpened
			}
		case 'UPDATE_SUGGEST_NEW_TIME':
			var newTime = action.newTimeInterval
			if(newTime < 1 || newTime > 6)
				return state
			else
				return {
					...state,
					suggestNewTime: newTime
				}
		default:
			return state
	}
}

module.exports = exportVar