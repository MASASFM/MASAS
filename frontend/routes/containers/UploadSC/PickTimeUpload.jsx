var ReactRedux = require("react-redux")
var PickTimeUpload = require('../../components/UploadSC/PickTimeUpload.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		closeWindow: () => dispatch({type:'SYNC_SONG', song: null})
	}
}

var PickTimeUpload = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(PickTimeUpload)
module.exports = PickTimeUpload;
