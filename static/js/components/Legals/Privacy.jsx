var React = require("react")
var ReactDOM = require("react-dom")

var LegalsContent = require('./LegalsContent.jsx')

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var Privacy = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		// this.props.updateTitle('Template', '0')		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		return (
			<LegalsContent>
				Privacy
			</LegalsContent>
		)
	}
})

module.exports = Privacy