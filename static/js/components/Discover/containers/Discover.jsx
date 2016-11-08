var Discover = {}
import {
	incrementLoggedOutUserStep,
	updatePageTitle,
	toogleIsModalOpened,
	closeAndEmptyMainModal,
	updateModalType,
	changeModalContent,
} from "../../../reducers/actions/App.js"

import {
	changeDiscoverNumber,
} from "../../../reducers/actions/Discover.js"

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
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType, closeModalFunc) => dispatch(changeModalContent(modalContent, modalType, closeModalFunc)),
		updateModalType: (modalType) => dispatch(updateModalType(modalType)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),

		// page state updates

		// other state updates 
		handleTimePickerChange: (discoverNumber) => dispatch(changeDiscoverNumber(discoverNumber)),
		incrementLoggedOutUserStep: () => dispatch(incrementLoggedOutUserStep()),
	}
}

module.exports = Discover
