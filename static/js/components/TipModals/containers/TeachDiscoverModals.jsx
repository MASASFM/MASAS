var TeachDiscoverModals = {}

TeachDiscoverModals.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
	}
}

TeachDiscoverModals.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
	}
}

module.exports = TeachDiscoverModals
