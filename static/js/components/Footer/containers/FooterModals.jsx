
var FooterModal = {}

// Which part of the Redux global state does our component want to receive as props?
FooterModal.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		SC_songInfo: state.playerReducer.SC_songInfo,
	}
}

// Which action creators does it want to receive by props?
FooterModal.mapDispatchToProps = function(dispatch) {
	return {
		
	}
}

module.exports = FooterModal
