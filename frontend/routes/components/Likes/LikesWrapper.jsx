var React = require("react")
var ReactDOM = require("react-dom")

import { MobileBlurBackground } from "../MASAS_mixins.jsx"


var LikesWrapper = React.createClass({
	mixins: [ MobileBlurBackground ],
	
	componentWillMount: function() {
		// this.props.updateTitle()
	},

	render: function() {
		var marginHeight = '3rem'
		var marginStyle = {
			minHeight:  marginHeight,
			maxHeight: marginHeight
		}
		return (
			<div className="app-body" >
				<div className="row row-display-none-sm no-margin" style={ marginStyle }>
					<div className="col-md-2">
						<div className="box"></div>
					</div>
					<div className="col-md-8 profile-header-desktop">
						<div className="box page-title">{ this.props.title }</div>
						<hr />
					</div>
					<div className="col-md-2">
						<div className="box"></div>
					</div>
				</div>
				<div className="row no-margin likes-scroll--wrapper">
					<div className="col-md-2 col-display-none-sm">
						<div className="box"></div>
					</div>
					<div className="col-xs-12 col-md-8 page-content--wrapper">
						<div className="box page-content" style={{backgroundColor: 'rgba(0,0,0,0)'}}>
							<div className="likes--wrapper">
								{ this.props.children }
							</div>
						</div>
					</div>
					<div className="col-md-2 col-display-none-sm">
						<div className="box"></div>
					</div>
				</div>

			</div>
		)
	}
});


module.exports = LikesWrapper