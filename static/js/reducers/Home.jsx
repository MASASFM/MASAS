let exportVar = {}

exportVar.defaultState = {
	currentPage: 1,								// (int) current page on the home page
	unsplashArtistUsername: "jeromeprax",				// (string) unsplash username  to look up backgrounds against
	unsplashArtistName: "Jérome Prax", 					// (string) unsplash name to display
	backgroundURL: "https://source.unsplash.com/user/jeromeprax/1600x900",							// (string) unsplash URL of bg
	timePickerDemo: 2,							// (int) discover number on TimePicker on Home page info part
}
const{ defaultState } = exportVar

exportVar.homeReducer = function(state = defaultState, action) {
	switch(action.type) {
		case 'CHANGE_TIME_PICKER_DEMO':
			return {
				...state,
				timePickerDemo: action.timePickerDemo
			}
		case 'CHANGE_HOME_PAGE_NUMBER':
			// action.pageNumber: page to go to
			// action.totalNumberPages: total pages on home page (passed as arg for now)
			let pageNumber = action.pageNumber
			if(pageNumber > action.totalNumberPages || pageNumber < 1)
				pageNumber = 1

			return {
				...state,
				currentPage: pageNumber
			}
		case 'CHANGE_UNSPLASH_ARTIST':
			return {
				...state,
				unsplashArtistName: action.unsplashArtistName,
				unsplashArtistUsername: action.unsplashArtistUsername,
				backgroundURL: action.backgroundURL
			}
		case 'CHANGE_BACKGROUND':
			return {
				...state,
				backgroundURL: action.backgroundURL
			}
		default:
			return state
	}
}


module.exports = exportVar
