var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ProfileEdit.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Textbox } = require("../UI/UI.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")

// var ProfileEdit = (props) => {

// }

var ProfileEdit = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className="profile-edit--wrapper">
				<div className="personal-info">
					<Textbox id="stage-name">Stage Name</Textbox>
					<Textbox id="city">City</Textbox>
					<Textbox id="occupation">Occupation</Textbox>
				</div>
				<div className="links-info">
					<ProfileEditLinks />
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEdit)