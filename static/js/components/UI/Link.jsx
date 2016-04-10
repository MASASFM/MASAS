var React = require("react")
var ReactDOM = require("react-dom")

var { browserHistory } = require('react-router')

var Link = React.createClass({
	propTypes: {
		to: React.PropTypes.string,				// path to forward to
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool
	},

	componentWillMount: function() {
	},

	goToURL: function(path) {
		browserHistory.push(path)
	},

	render: function() {
		return (
			<span onClick={this.props.onClick}>
				<span onClick={!this.props.disabled ? this.goToURL.bind(null, this.props.to) : null} 
					className={"MASAS-link " + (this.props.className ? this.props.className : "") + (this.props.disabled ? " disabled" : "")}>
					{this.props.children}
				</span>
			</span>
		)
	}
})

module.exports = Link