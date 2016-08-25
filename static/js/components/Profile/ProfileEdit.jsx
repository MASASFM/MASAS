var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ProfileEdit.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Textbox } = require("../UI/UI.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")
var CountryAutocomplete = require("./CountryAutocomplete.jsx")

// var ProfileEdit = (props) => {

// }

var ProfileEdit = React.createClass({
	propTypes: {
		textboxValues: React.PropTypes.object,
		updateTextboxValues: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	updateName: function(name) {
		this.props.updateTextboxValues({ name })
	},

	updateCity: function(city) {
		this.props.updateTextboxValues({ city })
	},

	updateOccupation: function(occupation) {
		this.props.updateTextboxValues({ occupation })
	},

	render: function() {
		return (
			<div className="profile-edit--wrapper">
				<div className="personal-info">
					<Textbox onChange={ this.updateName } value={ this.props.textboxValues.name } id="stage-name">Stage Name</Textbox>
					<Textbox onChange={ this.updateCity } value={ this.props.textboxValues.city } id="city">City</Textbox>
					<Textbox onChange={ this.updateOccupation } value={ this.props.textboxValues.occupation } id="occupation">Occupation</Textbox>
					<CountryAutocomplete />
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