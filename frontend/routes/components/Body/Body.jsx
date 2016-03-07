var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")

var Body = require("../../containers/Body/Body.jsx")
var Home = require("../Home/Home.jsx")

var Body = (props) => {
	return (
		<div style={styles.outerDiv} >
			<h1>{props.title}</h1>
			<hr />
			<div style={styles.innerDiv}>
				{ props.content ? props.content : <Home /> }
			</div>
		</div>
	)
}

var verticalPaddingSize = '5em'
var horizontalPaddingSize = '15em'
var styles = {
	outerDiv: {
		paddingLeft: horizontalPaddingSize,
		paddingRight: horizontalPaddingSize,
		flex: 1,
		position: 'relative'
	},
	innerDiv: {
		backgroundColor: 'rgba(0,0,0,0.7)',
		position: 'absolute',
		top: verticalPaddingSize,
		bottom: verticalPaddingSize,
		left: horizontalPaddingSize,
		right: horizontalPaddingSize,
	}
}

module.exports = Radium(Body)