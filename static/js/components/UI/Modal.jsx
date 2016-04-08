// NEEDS DIRECT PARENT WITH => position: relative, height = something, width = something

var React = require("react")
var ReactDOM = require("react-dom")

let Modal = React.createClass({
	propTypes: {
		isOpened: React.PropTypes.bool,			// is modal shown
		closeModalFunc: React.PropTypes.func, 		// what to execute when clicking on close modal area (arrow or overlay)
	},

	getDefaultProps: function() {
		return {
			isOpened: false,	
			closeModalFunc: () => console.log('no closing function attached to modal')	
		}
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
	},

	componentDidUpdate: function() {
	},

	componentWillReceiveProps: function(nextProps) {

	},

	render: function() {
		return (
			<div className={ "MASAS-modal" + (this.props.isOpened ? "" : " closed") }>
				<div className="modal-overlay" onClick={ this.props.closeModalFunc }>
					
				</div>
				<div className="modal-content--wrapper">
					<img onClick={ this.props.closeModalFunc } src="/static/img/MASAS_close_icon.svg" className="close-icon" alt="close modal" />
					<div className="modal-content">
						{ this.props.children }
					</div>
				</div>
			</div>
			)
	}
})

module.exports = Modal