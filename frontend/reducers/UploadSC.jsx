var defaultState = {
	choosingTime: null,							//
}

function uploadSCReducer(state = defaultState, action) {
	
	switch(action.type) {
		case 'SYNC_SONG':
			return {
				...state,
				choosingTime: action.song
			};

		default:
			return state;
	}
}


module.exports = uploadSCReducer;