var { reportCopyright, reportSpam } = require('../ajaxCalls.jsx')

var FooterModal = {}

// Which part of the Redux global state does our component want to receive as props?
FooterModal.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		SC_songInfo: state.playerReducer.SC_songInfo,
		suggestNewTimeValue: state.footerReducer.suggestNewTime,
	}
}

// Which action creators does it want to receive by props?
FooterModal.mapDispatchToProps = function(dispatch) {
	return {
		updateTimeSuggestion: (newTimeInterval) => {
			dispatch({ type: 'UPDATE_SUGGEST_NEW_TIME', newTimeInterval })
		},
		toogleIsModalOpened: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		reportCopyright,
		reportSpam,
	}
}

module.exports = FooterModal
