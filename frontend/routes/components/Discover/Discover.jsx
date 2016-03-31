var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
// var { Link } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var Discover = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Discover', '0')		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		return (
			<div className="discover--wrapper">
			</div>
		)
	}
})

module.exports = Discover