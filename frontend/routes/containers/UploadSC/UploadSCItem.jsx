var ReactRedux = require("react-redux")
var UploadSCItem = require('../../components/UploadSC/UploadSCItem.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		chooseTime: (song) => dispatch({type:'SYNC_SONG', song: song})
	}
}

var UploadSCItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSCItem)
module.exports = UploadSCItem;
