import { changeBgState } from "../../../reducers/actions/App.js"

var Modal = {}

// Which part of the Redux global state does our component want to receive as props?
Modal.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
Modal.mapDispatchToProps = function(dispatch) {
	return {
		modalBlurBg: (blur) => dispatch(changeBgState.modalBlur(blur)),
		modalSaturateBg: (sat) => dispatch(changeBgState.modalSaturate(sat)),
	}
}

module.exports = Modal
