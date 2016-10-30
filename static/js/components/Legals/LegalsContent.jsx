var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/LegalsContent.jsx")

var { Body, Button } = require("../UI/UI.jsx")

var LegalsContent = React.createClass({
	propTypes: {
		splashScreenLegals: React.PropTypes.bool,
	},

	getDefaultProps: function() {
		return {
			splashScreenLegals: false
		}
	},

	componentWillMount: function() {
		if(!this.props.splashScreenLegals)
			this.props.updateTitle('Legals', this.props.goToHome )

		// this.props.updateTitle('Legals', this.props.goToHome )		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		const content = (
			<div className="legals-content--wrapper">
				<div className="legals-content">
					{ this.props.children }
				</div>
				<div onClick={ this.props.goToHome } className="back-icon">
					<img src="/static/img/MASAS_arrow_left.svg" alt="back" />
				</div>
			</div>
			)

		if(this.props.splashScreenLegals)
			return content
		else
			return (
				<Body>
					{ content }	
				</Body>
			)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(LegalsContent)