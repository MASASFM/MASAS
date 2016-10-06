var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Template.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var Template = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Template', '0')		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		return (
			<div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Template)