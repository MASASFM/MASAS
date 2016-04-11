var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/LegalsHome.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Body } = require("../UI/UI.jsx")
var LegalsContent = require("./LegalsContent.jsx")
var EnforcementGuidelines = require("./EnforcementGuidelines.jsx")
var Guidelines = require("./Guidelines.jsx")
var LearnCopyright = require("./LearnCopyright.jsx")
var Privacy = require("./Privacy.jsx")
var ReportCopyright = require("./ReportCopyright.jsx")
var Terms = require("./Terms.jsx")
var Rest = require("./Rest.jsx")

// var Template = (props) => {

// }

var LegalsHome = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Legals', '0')		// 0 = menu icon; 1 = arrow back
	},

	componentWillUpdate: function() {
		this.props.updateTitle('Legals', '0')		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		switch(this.props.pageNumber) {
			case 1:
				return <LegalsContent><Terms /></LegalsContent>
			case 2:
				return <Guidelines />
			case 3:
				return <Privacy />
			case 4:
				return <LearnCopyright />
			case 5:
				return <ReportCopyright />
			case 6:
				return <EnforcementGuidelines />
			case 7:
				return <Rest />
			default:
				return (
					<Body>
						<div className="legals--wrapper">
							<img src="/static/img/MASAS_icon_legals_deco1.svg" alt="stars" className="star-icon" />
							<div className="logo--wrapper">
								<img src="/static/img/MASAS_logo-M.svg" alt="logo" className="logo" />
							</div>
							<div className="text--wrapper">
								<p>
									MASAS aims to be fair and transparent when it comes to the use of it's interactive and collaborative platform
								</p>
								<p>
									Below are information that should be read be all users:
								</p>
							</div>
							<div className="links--wrapper">
								<span onClick={ this.props.goToPage.bind(this, 1) } className="legal-links">Terms of Uses</span>
								<span onClick={ this.props.goToPage.bind(this, 2) } className="legal-links">Community Guidelines</span>
								<span onClick={ this.props.goToPage.bind(this, 3) } className="legal-links">Privacy Policy</span>
								<span onClick={ this.props.goToPage.bind(this, 4) } className="legal-links">Learn About Copyrights</span>
								<span onClick={ this.props.goToPage.bind(this, 5) } className="legal-links">Report Copyright Infringement</span>
								<span onClick={ this.props.goToPage.bind(this, 6) } className="legal-links">Law Enforcement Guidelines</span>
								<span onClick={ this.props.goToPage.bind(this, 7) } className="legal-links">Law Enforcement - User Information - Requests</span>
							</div>
						</div>
					</Body>
				)
		}
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(LegalsHome)