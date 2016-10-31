var { getUserTracks } = require('../ajaxCalls.jsx')

import { 
	changeModalContent, 
	updateModalType, 
	closeAndEmptyMainModal,
	toogleIsModalOpened,
	updatePageTitle,
} from '../../../reducers/actions/App.js'

import { 
	updateSCUserTracks,
	updateMasasUserTracks,
	updateSCUsername,
	updateIsConnectedSC,
} from '../../../reducers/actions/UploadSC.js'

var UploadSC = {} 

// Which part of the Redux global state does our component want to receive as props?
UploadSC.mapStateToProps = function(state) {
	return {
		// app state
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		userData: state.appReducer.userData,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,

		// page state
		choosingTime: state.uploadSCReducer.choosingTime,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
		SCusername:  state.uploadSCReducer.SCusername,
		isConnectedSoundcloud: state.uploadSCReducer.isConnectedSoundcloud,

		// other states
	}
}

// Which action creators does it want to receive by props?
UploadSC.mapDispatchToProps = function(dispatch) {
	return {
		// higher level state updates
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		toogleModal: () => dispatch(toogleIsModalOpened),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		updateModalType: (modalType) => dispatch(updateModalType(modalType)),
		closeModal: () => dispatch(closeAndEmptyMainModal),
		
		// page state updates
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch(updateSCUserTracks(soundcloudUserTracks)),
		updateMasasUserTracks: (masasUserTracks) => dispatch(updateMasasUserTracks(masasUserTracks)),
		updateSCusername: (SCusername) => dispatch(updateSCUsername(SCusername)),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch(updateIsConnectedSC(isConnectedSoundcloud)),
		getUserTracks: (userPk, success, error) => getUserTracks(userPk, success, error),

		// other state updates
	}
}

module.exports = UploadSC
