var PickTimeUpload = {}


// Which part of the Redux global state does our component want to receive as props?
PickTimeUpload.mapStateToProps = function(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
	}
}

// Which action creators does it want to receive by props?
PickTimeUpload.mapDispatchToProps = function(dispatch) {

	var closeWindow = () => {
		dispatch({ type:'CLOSE_PICK_TIME_WINDOW' })
	}

	return {
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType, backArrowFunc: closeWindow}),
		closeWindow,
		onTimeChanged: (time) => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', time: time}),
		handleTimePickerChange: (newDiscover) => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', newDiscover}),
		emitNotification: (text) => {
			dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
			dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: text})
		},
	}
}

module.exports = PickTimeUpload
