var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ProfileEditLinks.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Textbox } = require("../UI/UI.jsx")

// var ProfileEditLinks = (props) => {

// }

var ProfileEditLinks = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Textbox />
				<Textbox />
				<Textbox />
				<Textbox />
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEditLinks)