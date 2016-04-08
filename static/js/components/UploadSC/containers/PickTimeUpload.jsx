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
	var handleTimePickerChange = function(rangeValue, currentPickTimeUpload) {
		var pickTimeUpload = Math.floor(rangeValue/100*6) + 1

		if(pickTimeUpload > 6)
			pickTimeUpload = 6
		if(pickTimeUpload < 0)
			pickTimeUpload = 0

		if(pickTimeUpload !== currentPickTimeUpload)
			dispatch({type:'HANDLE_PICK_TIME_UPLOAD', rangeValue, pickTimeUpload})
	}

	var closeWindow = () => { dispatch({ type:'CLOSE_PICK_TIME_WINDOW' }) }

	return {
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType, backArrowFunc: closeWindow}),
		closeWindow,
		onTimeChanged: (time) => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', time: time}),
		handleTimePickerChange,
		emitNotification: (text) => {
			dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
			dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: text})
		},
	}
}

module.exports = PickTimeUpload
