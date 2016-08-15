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
			<div className="links-edit--wrapper">
				<div className="link-edit">
					<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
					<Textbox />
				</div>
				<div className="link-edit">
					<img src="/static/img/twitter.svg" alt="twitter" />
					<Textbox />
				</div>
				<div className="link-edit">
					<img src="/static/img/MASAS_logo_world.svg" alt="personal page" />
					<Textbox />
				</div>
				<div className="link-edit">
					<img src="/static/img/facebook.svg" alt="facebook" />
					<Textbox />
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEditLinks)