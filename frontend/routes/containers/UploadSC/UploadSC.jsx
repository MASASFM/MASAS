var ReactRedux = require("react-redux")
var UploadSC = require('../../components/UploadSC/UploadSC.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	console.log(state.uploadSCReducer.choosingTime)
	return {
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		choosingTime: state.uploadSCReducer.choosingTime,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType})
	}
}

var UploadSC = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSC)
module.exports = UploadSC;
