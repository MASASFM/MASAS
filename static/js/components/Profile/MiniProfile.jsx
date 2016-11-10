var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/MiniProfile.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

var MiniProfile = React.createClass({
	propTypes: {
		userData: React.PropTypes.object,
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div>
				{ this.props.userData.name }
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(MiniProfile)