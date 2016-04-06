var { getUserTracks } = require('../ajaxCalls.jsx')

var UploadSC = {} 

// Which part of the Redux global state does our component want to receive as props?
UploadSC.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		choosingTime: state.uploadSCReducer.choosingTime,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
		SCusername:  state.uploadSCReducer.SCusername,
		isConnectedSoundcloud: state.uploadSCReducer.isConnectedSoundcloud,
	}
}

// Which action creators does it want to receive by props?
UploadSC.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch({type: 'UPDATE_SC_USER_TRACKS', soundcloudUserTracks}),
		updateMasasUserTracks: (masasUserTracks) => dispatch({type: 'UPDATE_MASAS_USER_TRACKS', masasUserTracks}),
		updateSCusername: (SCusername) => dispatch({type: 'UPDATE_SC_USERNAME', SCusername}),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch({type: 'UPDATE_IS_CONNECTED_SC', isConnectedSoundcloud}),
		getUserTracks: (userPk, success, error) => getUserTracks(userPk, success, error)
	}
}

module.exports = UploadSC
