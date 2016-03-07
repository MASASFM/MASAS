var ReactRedux = require("react-redux")
var Template = require('../../components/Template/Template.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
	}
}

var Template = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Template)
module.exports = Template
