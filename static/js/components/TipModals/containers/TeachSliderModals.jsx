import {
	toogleIsModalOpened,
	closeAndEmptyMainModal,
} from "../../../reducers/actions/App.js"

var TeachUploadModals = {}

TeachUploadModals.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
		tipTimePickerValue: state.uploadSCReducer.tipTimePickerValue,
	}
}

TeachUploadModals.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch(toogleIsModalOpened()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		handleTimePickerChange: newDiscover => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', newDiscover}),
		updateTipTimePickerValue: tipTimePickerValue => dispatch({ type:'UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE', tipTimePickerValue}),
	}
}

module.exports = TeachUploadModals
