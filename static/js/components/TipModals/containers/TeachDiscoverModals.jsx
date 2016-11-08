import {
	toogleIsModalOpened,
} from "../../../reducers/actions/App.js"

var TeachDiscoverModals = {}

TeachDiscoverModals.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
	}
}

TeachDiscoverModals.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch(toogleIsModalOpened()),
	}
}

module.exports = TeachDiscoverModals
