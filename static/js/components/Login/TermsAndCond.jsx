var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TermsAndCond.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Button, Checkbox, Link } = require("../UI/UI.jsx")

var Terms= require('../Legals/Terms.jsx')
// var Template = (props) => {

// }

var TermsAndCond = React.createClass({
	propTypes: {
		userPk: React.PropTypes.number,
		userToken: React.PropTypes.string, 
		userData: React.PropTypes.object
	},

	componentWillMount: function() {
		this.props.updateTitle('Template', '0')		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		// console.log(<TermsText />)
		return (
			<div className="term-and-cond-modal-content">
				<div className="legals-content--wrapper">
					<div className="legals-content">
						<Terms />
					</div>
				</div>
				<p className="accept-text">
					By creating an account I accept MASAS's Terms of Uses and Privacy Policy
				</p>
				<Button isBigButton={ true }>Get Early Access</Button>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(TermsAndCond)