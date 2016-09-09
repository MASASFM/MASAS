var TeachUploadModals = {}

TeachUploadModals.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
	}
}

TeachUploadModals.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		closeModal: () => dispatch({ type: 'CLOSE_AND_EMPTY_MAIN_MODAL' })
	}
}

module.exports = TeachUploadModals
