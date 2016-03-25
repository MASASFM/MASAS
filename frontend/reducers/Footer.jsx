let exportVar = {}

exportVar.defaultState = {
	progressBar: 0,				// (INT) 0-100, song progress time bar
	isOpened: false,				// (BOOL), is footer opened
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
		default:
			return state
	}
}

module.exports = exportVar