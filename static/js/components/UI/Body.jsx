var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Body.jsx")

var Body = React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,
		title: React.PropTypes.string,
		noBackground: React.PropTypes.bool,		// should Body background be dark or transparent
	},

	getDefaultProps: function() {
		return {
			noBackground: false,				// show dark background by default
		}
	},

	componentWillMount: function() {
	},

	render: function() {
		var marginHeight = '4.2rem'
		var marginStyle = {
			minHeight:  marginHeight,
			maxHeight: marginHeight
		}
		return (
			<div className="app-body body--wrapper" >
				<div className="row row-display-none-sm no-margin" style={ marginStyle }>
					<div className="col-md-2">
						<div className="box"></div>
					</div>
					<div 
						style={{
							visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
						}}
						className="col-md-8 page-title--wrapper">
						<div className="box page-title">{ this.props.title }</div>
						<hr />
					</div>
					<div className="col-md-2">
						<div className="box"></div>
					</div>
				</div>
				<div className="row no-margin">
					<div className="col-md-2 col-display-none-sm">
						<div className="box"></div>
					</div>
					<div className="col-xs-12 col-md-8 page-content--wrapper">
						<div className={ "box page-content" + ( this.props.noBackground ? " no-background" : "" ) }>
							{ this.props.children }
						</div>
					</div>
					<div className="col-md-2 col-display-none-sm">
						<div className="box"></div>
					</div>
				</div>
				<div className="row row-display-none-sm no-margin" style={ marginStyle }>
					<div className="col-xs-12">
					</div>
				</div>
			</div>
		)
	}
})


module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Body)