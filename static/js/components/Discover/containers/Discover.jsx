var { toggleSongLike } = require("../../../MASAS_functions.jsx")

var Discover = {}

// Which part of the Redux global state does our component want to receive as props?
Discover.mapStateToProps = function(state) {
	return {
		discoverNumber: state.discoverReducer.discoverNumber,
		userToken: state.appReducer.MASASuser,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened
	}
}

// Which action creators does it want to receive by props?
Discover.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber}),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
		updateModalType: (modalType) => dispatch({ type: 'UPDATE_MODAL_TYPE', modalType }),
	}
}

module.exports = Discover