let exportVar = {}

exportVar.defaultState = {
	choosingTime: null,							
}
const { defaultState } = exportVar

exportVar.uploadSCReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'SYNC_SONG':
			return {
				...state,
				choosingTime: action.song
			}

		default:
			return state
	}

}


module.exports = exportVar