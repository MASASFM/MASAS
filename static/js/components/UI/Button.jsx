var React = require("react")
var ReactDOM = require("react-dom")

var Button = React.createClass({
	propTypes: {
		// caps: React.PropTypes.bool,				// should button text be in all caps
		white: React.PropTypes.bool,				// should button text be in all caps
		// small: React.PropTypes.bool,				// should button be in small version
		noBorders: React.PropTypes.bool,				// should button have borders
		className: React.PropTypes.string,				// class names
		isBigButton: React.PropTypes.bool, 			// is it a big button
		isSecondaryAction: React.PropTypes.bool,		// is it a secondary button
		onClick: React.PropTypes.func.isRequired,		// what to do when user clicks on button
		isDisabled: React.PropTypes.bool,			// is button disabled
	},

	componentWillMount: function() {
	},

	getDefaultProps: function() {
		return {
				className: "",
				isDisabled: false,
			}
	},

	render: function() {
		return (
			<div className={"MASAS-button" + (this.props.isSecondaryAction ? " secondary-button " : "") + (" " + this.props.className + " ") + (this.props.isBigButton ? "MASAS-big-button " : "") +  (this.props.noBorders ? " no-borders " : "") } onClick={ !this.props.disabled ? this.props.onClick : ( () => {} ) }>
				<div className={"wrapper"}>
					{this.props.children}
				</div>
			</div>
		)
	}
})

module.exports = Button