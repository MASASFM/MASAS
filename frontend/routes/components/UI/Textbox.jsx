var React = require("react")
var ReactDOM = require("react-dom")

var Textbox = React.createClass({
	propTypes: {
		label: React.PropTypes.string,				// textbox label
		labelError: React.PropTypes.string,			// textbox label when error
		error: React.PropTypes.bool,				// true = error
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className="MASAS-textbox">
				<div className={"wrapper" + (this.props.error ? " error" : "")}>
					<label className="MASAS-label" htmlFor={this.props.id}>
						{ this.props.error ?
							this.props.labelError 
							:
							this.props.children 
						}
					</label>
					<input id={this.props.id} className="MASAS-text-input" type="text" />
				</div>
			</div>
		)
	}
});

module.exports = Textbox