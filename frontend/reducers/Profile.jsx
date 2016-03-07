var defaultState = {

}

function profileReducer(state = defaultState, action) {
	
	switch(action.type) {
		case 'TYPE':
			return {
				...state,
				type: action.type
			};

		default:
			return state;
	}
}


module.exports = profileReducer;