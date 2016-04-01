var ReactRedux = require("react-redux")
var PickTimeUpload = require('../../components/UploadSC/PickTimeUpload.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	var handleTimePickerChange = function(rangeValue, currentPickTimeUpload) {
		var pickTimeUpload = Math.floor(rangeValue/100*6) + 1

		if(pickTimeUpload > 6)
			pickTimeUpload = 6
		if(pickTimeUpload < 0)
			pickTimeUpload = 0

		if(pickTimeUpload !== currentPickTimeUpload)
			dispatch({type:'HANDLE_PICK_TIME_UPLOAD', rangeValue, pickTimeUpload})
	}

	var closeWindow = () => { dispatch({type:'CLOSE_PICK_TIME_WINDOW'}) }

	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType, backArrowFunc: closeWindow}),
		closeWindow,
		onTimeChanged: (time) => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', time: time}),
		handleTimePickerChange,
	}
}

var PickTimeUpload = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(PickTimeUpload)
module.exports = PickTimeUpload;
