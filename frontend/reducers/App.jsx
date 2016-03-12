let exportVar = {} 

exportVar.defaultState = {
	MASASuser: 0, 	// user login token
	MASASuserPk: null, 	
	pageTitle: 'home', 
	pageType: 0,		// 0 = hamburger icon, 1 = arrow icon
	navSiderbarOpen: false,
	processingAuthCookie: true,			// (bool) don't render app children until set to false
}

const { defaultState } = exportVar

exportVar.appReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'LOGIN':
			// login(action.token)
			return {
				...state,
				MASASuser: action.token
			}
		 case 'LOGOUT':
			return {
				...state,
				MASASuser: null,
				MASASuserPk: null
			}
		case 'UPDATE_PAGE_TITLE':
			let pageType = action.pageType
			
			if(typeof(pageType) !== "number")
				pageType = 0

			if(pageType > 1 || pageType < 0)
				pageType = 0

			return {
				...state,
				pageTitle: action.title,
				pageType: pageType 
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