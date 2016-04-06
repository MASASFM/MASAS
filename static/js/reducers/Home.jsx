let exportVar = {}

exportVar.defaultState = {
	currentPage: 1								// current page on the home page
}
const{ defaultState } = exportVar

exportVar.homeReducer = function(state = defaultState, action) {
	switch(action.type) {
		case 'CHANGE_HOME_PAGE_NUMBER':
			console.log(action)
			// action.pageNumber: page to go to
			// action.totalNumberPages: total pages on home page (passed as arg for now)
			let pageNumber = action.pageNumber
			if(pageNumber > action.totalNumberPages || pageNumber < 1)
				pageNumber = 1

			return {
				...state,
				currentPage: pageNumber
			}
		default:
			return state
	}
}


module.exports = exportVar