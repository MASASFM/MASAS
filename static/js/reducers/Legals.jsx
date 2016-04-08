let exportVar = {}

exportVar.defaultState = {
	pageNumber: 0, 				// (int) what legal page to show (0 = legals home page)
}
const { defaultState } = exportVar

exportVar.legalsReducer = function(state = defaultState, action) {

	switch(action.type) {
		case 'TOOGLE_LEGALS_PAGE_NUMBER':
			var pageNumber = action.pageNumber
			return {
				...state,
				pageNumber
			}

		default:
			return state
	}
}


module.exports = exportVar