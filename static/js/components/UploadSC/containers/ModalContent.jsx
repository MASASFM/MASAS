
var ModalContent = {}

// Which part of the Redux global state does our component want to receive as props?
ModalContent.mapStateToProps = function(state) {
	return {
	}
}

// Which action creators does it want to receive by props?
ModalContent.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
	}
}

module.exports = ModalContent
