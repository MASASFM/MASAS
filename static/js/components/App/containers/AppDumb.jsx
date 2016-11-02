import {
	closeAndEmptyMainModal,
} from "../../../reducers/actions/App.js"

var AppDumb = {}

AppDumb.mapStateToProps = function(state) {
	return {
		bgFilter: state.appReducer.bgFilter,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		modalContent: state.appReducer.modalContent,
	}
}

AppDumb.mapDispatchToProps = function(dispatch) {
	return {
		closeModal: () => dispatch(closeAndEmptyMainModal())
	}
}

module.exports = AppDumb
