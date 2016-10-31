var React = require("react")

import { BlurBackground } from "../MASAS_mixins.jsx"


// var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/Template.jsx")

var {goToURL} = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")

var NoLikesComponent = React.createClass({
	mixins: [ BlurBackground ],

	propTypes: {
	},

	render: function() {
		console.log('yp')
		return (
			<div className="no-like--wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '17rem'}}>
					<img src="/static/img/MASAS_no_likes.svg" alt="like icon" />
					<p style={{ fontSize: '1.2rem'}}>
						You haven't liked any sounds yet
					</p>
					<Button 
						isBigButton={ true } 
						isSecondaryAction={ false } 
						onClick={ () => { $('#body--background').removeClass('blurred'); goToURL('/discover') } }>
						Start discovering new music
					</Button>
				</div>
			</div>
		)
	}
})

module.exports = NoLikesComponent
// ReactRedux.connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Template)