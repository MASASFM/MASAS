var React = require("react")
var ReactDOM = require("react-dom")

var Password = React.createClass({
	propTypes: {
		label: React.PropTypes.string,				// textbox label
		labelError: React.PropTypes.string,			// textbox label when error
		error: React.PropTypes.bool,				// true = error
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className="MASAS-password">
				<div className={"wrapper" + (this.props.error ? " error " : "")}>
					<label className="MASAS-label" htmlFor={this.props.id}>
						{ this.props.error ?
							this.props.labelError 
							:
							this.props.children 
						}
					</label>
					<input id={this.props.id} className="MASAS-password-input" type="password" />
				</div>
			</div>
		)
	}
});

module.exports = Password