var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Body, Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var InvitationPending = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<Body>
				<div className="invitation-pending--wrapper">
					<img src="/static/img/MASAS_icon_check_round.svg" alt="check logo" />
					<h2>thank you for your interest</h2>
					<Button isDisabled={ true } isBigButton={ true } isSecondaryAction={ true }>InvitationPending</Button>
					<p>
						We will send you an email when your invitation will be approved by a MASAS lover. With MASAS, we
						hope to nurture the true essence of an ever-expanding grassroots movement. Be part of the
						evolution, by simply sharing.
					</p>
				</div>
			</Body>
		)
	}
})

module.exports = InvitationPending