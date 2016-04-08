
var ModalContent = {}

// Which part of the Redux global state does our component want to receive as props?
ModalContent.mapStateToProps = function(state) {
	return {
		checkbox1_checked: state.uploadSCReducer.checkbox1_checked,
		checkbox2_checked: state.uploadSCReducer.checkbox2_checked,
		checkbox3_checked: state.uploadSCReducer.checkbox3_checked,
	}
}

// Which action creators does it want to receive by props?
ModalContent.mapDispatchToProps = function(dispatch) {
	return {
		
		toogleCheckbox1: () => dispatch({ type: 'TOOGLE_CHECKBOX_1'}),
		toogleCheckbox2: () => dispatch({ type: 'TOOGLE_CHECKBOX_2'}),
		toogleCheckbox3: () => dispatch({ type: 'TOOGLE_CHECKBOX_3'}),
	}
}

module.exports = ModalContent
