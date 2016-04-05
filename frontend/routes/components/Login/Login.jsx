var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")
var Body = require("../../containers/UI/Body.jsx")

var LoginForm = require("../../containers/Login/LoginForm.jsx")

// var Login = (props) => {
var Login = React.createClass({
	componentWillMount: function() {
		this.props.updateTitle()
	},

	render: function() {
		console.log("loginnn")
		var marginHeight = '3rem'
		var marginStyle = {
			minHeight:  marginHeight,
			maxHeight: marginHeight
		}
		return (
			<Body>
			<div className="app-body" >
				<div className="row row-display-none-sm no-margin" style={ marginStyle }>
					<div className="col-md-2">
						<div className="box"></div>
					</div>
					<div className="col-md-8">
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
						<div className="box page-content">
							<LoginForm fullForm={true} />
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
			</Body>
		)
		// return (
		// 	<div className="app-body" >
		// 		<h1>{this.props.title}</h1>
		// 		<hr />
		// 		<div style="content-overlay">
					
		// 		</div>
		// 	</div>
		// )
	}
});


// var Login = React.createClass({
// 	componentWillMount: function() {
// 		console.log(this.props.updateTitle())
// 	},

// 	render: function() {
// 		return (
// 			<div>Login</div>
// 		)
// 	}
// });


module.exports = Radium(Login)