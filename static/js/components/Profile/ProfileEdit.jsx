var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ProfileEdit.jsx")

var { Textbox } = require("../UI/UI.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")
var CountryAutocomplete = require("./CountryAutocomplete.jsx")

var ProfileEdit = React.createClass({
	propTypes: {
		textboxValues: React.PropTypes.object,
		updateTextboxValues: React.PropTypes.func,
		userData: React.PropTypes.object,
		show: React.PropTypes.bool.isRequired,		// should comp be shown
	},

	componentDidMount: function() {
		console.log("mounting")
		console.log(this.props.userData)
		if(typeof(this.props.userData.city.url) !== "undefined")
			this.props.updateTextboxValues({ city: this.props.userData.city.url })

		if(this.props.userData.name !== "")
			this.props.updateTextboxValues({ name: this.props.userData.name })

		if(this.props.userData.occupation !== "")
			this.props.updateTextboxValues({ occupation: this.props.userData.occupation })
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
		if(this.props.show)
			return (
				<div className="profile-edit--wrapper">
					<div className="personal-info">
						<Textbox onChange={ this.updateName } value={ this.props.textboxValues.name } id="stage-name">Stage Name</Textbox>
						<CountryAutocomplete onChange={ this.updateCity }/>
						<Textbox onChange={ this.updateOccupation } value={ this.props.textboxValues.occupation } id="occupation">Occupation</Textbox>
					</div>
					<div className="links-info">
						<ProfileEditLinks show={ this.props.show } />
					</div>
				</div>
			)
		else
			return <div></div>
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEdit)