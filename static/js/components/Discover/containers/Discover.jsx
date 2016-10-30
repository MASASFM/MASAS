var Discover = {}
import { incrementLoggedOutUserStep } from "../../../reducers/actions/App.js"

// Which part of the Redux global state does our component want to receive as props?
Discover.mapStateToProps = function(state) {
	return {
		// app state
		userToken: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,

		// page state
		discoverNumber: state.discoverReducer.discoverNumber,

		// other states
		songPlaying: state.playerReducer.songPlaying,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		loggedOutUserStep: state.appReducer.loggedOutUserStep,
	}
}

// Which action creators does it want to receive by props?
Discover.mapDispatchToProps = function(dispatch) {
	return {
		// higher level state updates
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent, modalType, closeModalFunc) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent, modalType, closeModalFunc }),
		updateModalType: (modalType) => dispatch({ type: 'UPDATE_MODAL_TYPE', modalType }),
		closeModal: () => dispatch({ type: 'CLOSE_AND_EMPTY_MAIN_MODAL' }),

		// page state updates

		// other state updates 
		handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber}),
		incrementLoggedOutUserStep: () => dispatch(incrementLoggedOutUserStep()),
	}
}

module.exports = Discover
