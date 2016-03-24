// NOT REDUX COMPONENT

var React = require("react")
var ReactDOM = require("react-dom")
var $ = require("jquery")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
// var { Link } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

// maps the slider value to sun coordinates
var mapSliderToHeight =  function(x) {

}

var pixelRatio = () => {
	return 1 // paper.view.pixelRatio
}

var TimePicker = React.createClass({
	propTypes: {
		// rangePercent: React.PropTypes.number		// number from 0 to 1 defining place of timer and of sun on canvas
		// canvasHeight: React.PropTypes.number		// canvas height in px
		// canvasWidth: React.PropTypes.number		// canvas width in px
	},

	getInitialState: function() {
		var rangePercent = 33			// slider value
		var sunCoords = { x: 99, y: 23.5 }
		return {
			rangePercent,
			sunCoords,
			canvasHeight: 0,					// (number) sun arc path center
			canvasWidth: 0,					// (number) sun arc path radius
			arcCenterCoords: { x: 0, y: 0 },				// (object) center of arc circle coord
			arcRadius: 0						// (number) sun arc path radius
		}
	},

	componentWillMount: function() {
	},

	componentDidMount: function() {
		// var pixelRatio = paper.view.pixelRatio

		// GET CANVAS DIMENSIONS AND RESIZE IF NECESSARY
		var canvas = document.getElementById('timePicker-canvas')

		var canvasHeight = 140 * pixelRatio()
		var canvasWidth = 300 * pixelRatio()

			// can't have sunset curve if canvas isn't at least twice as wide as high
		if(2*canvasHeight > canvasWidth) {
			canvas.height(canvasWidth / 2)
			canvasWidth = canvas.width()
		}

			// define sun arc path center and radius (magic numbers used for ajusting curves)
		var arcRadius = canvasWidth / 1.9
		var arcCenterCoords = { x: canvasWidth / 2, y: arcRadius + 15}

		// save dimensions in state vars
		this.setState({ canvasHeight, canvasWidth, arcCenterCoords, arcRadius })
	},

	renderSunArcPath: function() {
		var canvas = document.getElementById('timePicker-canvas')

		// SETUP PAPER JS
		paper.setup(canvas)

		//DRAW AND STYLE ARC CIRCLE
			// draw arc from circle radius and center
		var center = new paper.Point(this.state.arcCenterCoords.x, this.state.arcCenterCoords.y)
		var path = new paper.Path.Circle(center, this.state.arcRadius)
		
			// style path
		path.strokeColor = 'white'
		path.opacity = 0.5
		path.dashArray = [5, 6]
		path.strokeWidth = 2

		// DRAW PATH ON CANVAS
		paper.view.draw()

	},

	handleSliderChange: function(e) {
		var sunCoords = this.getSunCoords(e.target.value)

		this.props.onChange(e.target.value, this.props.pickTimeUpload)
		this.setState({ rangePercent: e.target.value, sunCoords })
	},

	getSunCoords: function(sliderValue) {
		// calculating y from positive solutions to circle equation
		var { sqrt, pow } = Math

		var R = this.state.arcRadius
		var C = this.state.arcCenterCoords
		// var xOffset = ( this.state.canvasWidth - 2*R ) / 2
		// console.log(xOffset)
		var x = sliderValue / 100 * this.state.canvasWidth
		var y = -sqrt( pow( R, 2 ) - pow( x - C.x, 2 ) ) + C.y

		return { x: x / pixelRatio(), y: y / pixelRatio() }
	},

	render: function() {
		this.renderSunArcPath()

		var sunIconSize = 40
		var top = this.state.sunCoords.y - sunIconSize / 2
		var left = this.state.sunCoords.x - sunIconSize / 2
		var height = sunIconSize + "px"
		var width = sunIconSize + "px"

		var sunIconStyle = {
			position: 'absolute',
			top,
			left,
			height,
			width,
			zIndex: 1
		}

		return (
			<div className="timePicker--wrapper">
				<canvas id="timePicker-canvas"></canvas>
				<div className="timePicker-slider--wrapper">
					<input type="range" value={ this.state.rangePercent } onChange={ this.handleSliderChange } className="MASAS-slider" />
				</div>
				<img src="/static/img/time-picker-sun.png" style={sunIconStyle} />
			</div>
		)
	}
});

module.exports = TimePicker