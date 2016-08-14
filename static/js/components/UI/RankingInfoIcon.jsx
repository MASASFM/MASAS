var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/RankingInfoIcon.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var RankingInfoIcon = React.createClass({
	propTypes: {
		ranking: React.PropTypes.number.isRequired,				// 0: out; 1: popular; ]0,1[: discover 
	},

	componentWillMount: function() {
	},

	getInfoText: function() {
		if(this.props.ranking === 0)
			return "Out"
		else if(this.props.ranking === 1)
			return "Popular"
		else
			return "Discover"
	},

	render: function() {
		var viewBoxHeight = 30
		var lineYCoord = "" + (viewBoxHeight - 10)

		var discoverStart = 33
		var discoverEnd = 87

		var infoPosition = { t1: "0", t2: "0", c: "0"}
		if(this.props.ranking === 0)
			infoPosition = { t1: "13.4", t2: "13", c: "20" }
		else if(this.props.ranking === 1)
			infoPosition = { t1: "87.4", t2: "87", c: "100" }
		else {
			infoPosition = { 
				t1: (this.props.ranking * (discoverEnd - discoverStart) + discoverStart) - 15 + "", 
				t2: (this.props.ranking * (discoverEnd - discoverStart) + discoverStart) - 15 + "",  
				c: (this.props.ranking * (discoverEnd - discoverStart) + discoverStart) + "", 
			}
		}

		return (
			<div className="RankingInfoIcon--wrapper">	
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					viewBox={ "0 0 120 " + viewBoxHeight }
					className="line">
					<line x1="10" y1={ lineYCoord } x2={ (discoverStart -3) + ""} y2={ lineYCoord } className="out"/>
					<line x1={ discoverStart + "" } y1={ lineYCoord } x2={ discoverEnd + "" } y2={ lineYCoord } className="discover" />
					<line x1={ (discoverEnd + 3) + "" } y1={ lineYCoord } x2="110" y2={ lineYCoord } className="popular" />
					<circle cx={ infoPosition.c } cy={ lineYCoord } r="3" className="circle"/>
					<text x={ infoPosition.t1 } y="5" className="line1">Now in</text>
					<text x={ infoPosition.t2 } y="12" className="line2">
						{ this.getInfoText() }
					</text>
				</svg>
			</div>
		)
	}
})

module.exports = RankingInfoIcon