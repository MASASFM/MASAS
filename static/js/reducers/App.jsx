var React = require('react')
import { 
	INCREMENT_LOGGED_OUT_USER_STEP, 
	RESET_LOGGED_OUT_USER_STEP,
	CHANGE_MODAL_CONTENT,
	UPDATE_MODAL_TYPE,
	CLOSE_AND_EMPTY_MAIN_MODAL,
	TOOGLE_IS_MODAL_OPENED,
	UPDATE_PAGE_TITLE,
	BLUR_BG,
	SATURATE_BG,
	BLUR_BG_MOBILE,
	SATURATE_BG_MOBILE,
} from './actions/App.js'

let exportVar = {} 

exportVar.defaultState = {
	MASASuser: "", 	// user login token
	MASASuserPk: null, 	
	userData: {},	// user data (pk, username, email etc)
	pageTitle: 'home', 
	pageType: 0,		// 0 = hamburger icon, 1 = arrow icon
	navSiderbarOpen: false,
	processingAuthCookie: true,			// (bool) don't render app children until set to false
	backArrowFunc: () => "",			// (func) what happens when user clicks on back arrow 
	isAppFetching: false,				// (bool)
	isModalOpened: false,				// (bool) is modal opened
	modalContent: <div></div>, 			// (obj) modal content
	modalType: 1,					// (int) how the modal looks like. 1 for default
	splashScreenPage: 0,				// (int) main swiper page on login splash screen
	closeModalFunc: () => {}, 			// (func) function called on closin modal
	loggedOutUserStep: 0,				// (int) user step used to show tip modals when user logged out
	bgFilter: {					// (dict of bools) background state
		blurred: false,
		saturated: false,
		mobileBlurred: false,
		mobileSaturated: false,
	}
}

const { defaultState } = exportVar

exportVar.appReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case BLUR_BG:
			return {
				...state,
				bgFilter: {
					...state.bgFilter,
					blurred: action.isBlurred
				}
			}
		case SATURATE_BG:
			return {
				...state,
				bgFilter: {
					...state.bgFilter,
					blurred: action.isBlurred
				}
			}
		case BLUR_BG_MOBILE:
			return {
				...state,
				bgFilter: {
					...state.bgFilter,
					blurred: action.isBlurred
				}

			}
		case SATURATE_BG_MOBILE:
			return {
				...state,
				bgFilter: {
					...state.bgFilter,
					blurred: action.isBlurred
				}
			}	
		case INCREMENT_LOGGED_OUT_USER_STEP:
			return {
				...state,
				loggedOutUserStep: state.loggedOutUserStep + 1
			}
		case RESET_LOGGED_OUT_USER_STEP:
			return {
				...state,
				loggedOutUserStep: 0
			}
		case 'CHANGE_SLASH_SCREEN_PAGE':
			return {
				...state,
				splashScreenPage: action.splashScreenPage,
			}
		case 'UPDATE_CLOSE_MODAL_FUNC':
			return {
				...state,
				closeModalFunc: action.closeModalFunc,
			}
		case 'UPDATE_USER_DATA':
			return {
				...state,
				userData: {
					...state.userData,
					...action.userData,
				}
			}
		case UPDATE_MODAL_TYPE:
			return {
				...state,
				modalType: action.modalType,
			}
		case TOOGLE_IS_MODAL_OPENED:
			return {
				...state,
				isModalOpened: !state.isModalOpened,
			}
		case CLOSE_AND_EMPTY_MAIN_MODAL:
			return {
				...state,
				isModalOpened: defaultState.isModalOpened,
				modalContent: defaultState.modalContent,
			}
		case CHANGE_MODAL_CONTENT:
			var modalType = 1
			if(action.modalType)
				modalType = action.modalType

			if(modalType < 1)
				modalType = 1

			var closeModalFunc = defaultState.closeModalFunc
			if(action.closeModalFunc)
				closeModalFunc = action.closeModalFunc

			return {
				...state,
				modalContent: action.modalContent,
				modalType,
				closeModalFunc,
			}
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
				userData: { ...state.userData, ...action.userData },
				MASASuserPk: action.pk
			}
		case 'LOGOUT':
			return {
				...state,
				MASASuser: defaultState.MASASuser,
				MASASuserPk: defaultState.MASASuser,
				userData: {}
			}
		case UPDATE_PAGE_TITLE:
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
