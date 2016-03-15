var React = require("react")
var ReactDOM = require("react-dom")

var Button = React.createClass({
	propTypes: {
		caps: React.PropTypes.bool,				// should button text be in all caps
		white: React.PropTypes.bool,				// should button text be in all caps
		small: React.PropTypes.bool,				// should button be in small version
		noBorders: React.PropTypes.bool,				// should button have borders
		className: React.PropTypes.string,				// class names
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className={"MASAS-button" + (this.props.white ? " white " : "") + (" " + this.props.className + " ") + (this.props.small ? "MASAS-small-button " : "") +  (this.props.noBorders ? " no-borders " : "") } onClick={this.props.onClick}>
				<div className={"wrapper"} style={{ textTransform: ( this.props.caps ? 'uppercase' : 'none') }}>
					{this.props.children}
				</div>
			</div>
		)
	}
});

module.exports = Button