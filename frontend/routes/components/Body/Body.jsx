var React = require("react")
var ReactDOM = require("react-dom")

var Home = require("../../Containers/Home/Home.jsx")

var Body = React.createClass({
	render: function() {
		return (
			<div style={styles.outerDiv}>
				<h1 ref="titleTest">{this.props.title}</h1>
				<hr />
				<div style={styles.innerDiv}>
					{ this.props.content ? this.props.content : <Home  /> }
				</div>
			</div>
		)
	}
})

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

module.exports = Body