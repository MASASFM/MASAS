var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TimePickerWrapper.jsx")

var TimePickerInside = require("./TimePickerInside.jsx")
var NoUISlider = require("react-nouislider")
// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var TimePickerWrapper = React.createClass({
	propTypes: {
		initialDiscover: React.PropTypes.number.isRequired, 			// 1-6 starting slider position	
		currentDiscover: React.PropTypes.number.isRequired, 		// 1-6 used to check if necessary to call onChange calback
		onSliderChange: React.PropTypes.func,	 			// callback called when slider changes
		wrapperClassName: React.PropTypes.string,				// class used to size TimePicker
		canvasId: React.PropTypes.string,					// canvas id used for drawing
		showHashtag: React.PropTypes.bool,					// should hashtag be shown for current slider position
		sliderValue: React.PropTypes.number,					// slider value affecting sun position
	},

	getDefaultProps: function() {
		return {
			initialDiscover: 1,
			currentDiscover: 1,
		}
	},

	componentWillMount: function() {
	},

	updateCanvas: function(e) {
		if(this.refs.canvas !== undefined)
			this.refs.canvas.setState({ rangePercent: parseFloat(e) })
	},

	render: function() {
		return (
			<div className="time-picker-wrapper-comp">
				<NoUISlider 
					range={{ min: 0, max: 100}}
					start={[0]} 
					onUpdate={ this.updateCanvas }
					/>
				<TimePickerInside 
					{ ...this.props }
					ref="canvas" />
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(TimePickerWrapper)