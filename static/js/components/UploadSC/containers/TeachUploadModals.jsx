var TeachUploadModals = {}

TeachUploadModals.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
	}
}

TeachUploadModals.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		closeModal: () => dispatch({ type: 'CLOSE_AND_EMPTY_MAIN_MODAL' }),
		handleTimePickerChange: (newDiscover) => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', newDiscover}),
	}
}

module.exports = TeachUploadModals
