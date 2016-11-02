import {
	closeAndEmptyMainModal,
	toogleIsModalOpened,
	doneProcessingAuthCookie,
	setAppFetchingStateTrue,
	setAppFetchingStateFalse,
} from "../../../reducers/actions/App.js"

// var ReactRedux = require("react-redux")
// var App = require('../components/App.jsx')

var { logInWithToken } = require("../../../MASAS_functions.jsx")

var App = {}

// Which part of the Redux global state does our component want to receive as props?
App.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		processingAuthCookie: state.appReducer.processingAuthCookie,
		MASASuser: state.appReducer.MASASuser,

		bgFilter: state.appReducer.bgFilter,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		modalContent: state.appReducer.modalContent,
	}
}

// Which action creators does it want to receive by props?
App.mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		logInWithToken: (authToken) => logInWithToken(dispatch, authToken),
		forceRender: () => dispatch(doneProcessingAuthCookie()),
		showAppFetchingBar: () => dispatch(setAppFetchingStateTrue()),
		hideAppFetchingBar: () => dispatch(setAppFetchingStateFalse()),
		updateUnsplashArtist: (name, username, url) => dispatch({ type: 'CHANGE_UNSPLASH_ARTIST', unsplashArtistUsername: username, unsplashArtistName: name, backgroundURL: url }),
		updateModalContent: (modalContent, modalType) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent, modalType }),
	}
}

module.exports = App
