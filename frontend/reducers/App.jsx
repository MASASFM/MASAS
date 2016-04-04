let exportVar = {} 

exportVar.defaultState = {
	MASASuser: 0, 	// user login token
	MASASuserPk: null, 	
	userData: {},	// user data (pk, username, email etc)
	pageTitle: 'home', 
	pageType: 0,		// 0 = hamburger icon, 1 = arrow icon
	navSiderbarOpen: false,
	processingAuthCookie: true,			// (bool) don't render app children until set to false
	backArrowFunc: () => "",			// (func) what happens when user clicks on back arrow 
	isAppFetching: false,				// (bool)
}

const { defaultState } = exportVar

exportVar.appReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'SET_APP_FETCHING_STATE_FALSE':
			return {
				...state,
				isAppFetching: false
			}
		case 'SET_APP_FETCHING_STATE_TRUE':
			return {
				...state,
				isAppFetching: true
			}
		case 'LOGIN':
			// login(action.token)
			return {
				...state,
				MASASuser: action.token,
				userData: { ...state.userData, ...action.userData }
			}
		case 'LOGOUT':
		console.log('LOGOUT!!')
			return {
				...state,
				MASASuser: null,
				MASASuserPk: null,
				userData: {}
			}
		case 'UPDATE_PAGE_TITLE':
			// HANDLE PAGE TYPE
			let pageType = action.pageType
			if(typeof(pageType) !== "number")
				pageType = 0
			if(pageType > 1 || pageType < 0)
				pageType = 0

			// HANDLE BACK ARROW FUNCTION
			let backArrowFunc = defaultState.backArrowFunc
			if(typeof(action.backArrowFunc) !== "undefined")			
				backArrowFunc = action.backArrowFunc

			return {
				...state,
				pageTitle: action.title,
				pageType: pageType,
				backArrowFunc
			}
		case 'TOOGLE_NAV_SIDEBAR':
			return {
				...state,
				navSiderbarOpen: !state.navSiderbarOpen
			}
		case 'UPDATE_USER_PK':
			return {
				...state,
				MASASuserPk: action.pk
			}
		case 'DONE_PROCESSING_AUTH_COOKIE':
			return {
				...state,
				processingAuthCookie: false
			}
		default:
			return state
	}
}


module.exports = exportVar