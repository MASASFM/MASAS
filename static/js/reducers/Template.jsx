let exportVar = {}

exportVar.defaultState = {}
const { defaultState } = exportVar

exportVar.templateReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'TYPE':
			return {
				...state,
				type: action.type
			};

		default:
			return state
	}
}


module.exports = exportVar