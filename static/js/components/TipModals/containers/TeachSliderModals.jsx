import {
	toogleIsModalOpened,
	closeAndEmptyMainModal,
} from "../../../reducers/actions/App.js"

import {
	handlePickTimeUpload,
	updateUploadTipTimePickerValue
} from "../../../reducers/actions/UploadSC.js"

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
		handleTimePickerChange: newDiscover => dispatch(handlePickTimeUpload(newDiscover)),
		updateTipTimePickerValue: tipTimePickerValue => dispatch(updateUploadTipTimePickerValue(tipTimePickerValue)),
	}
}

module.exports = TeachUploadModals
