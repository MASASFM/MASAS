var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/HeaderDropdown.jsx")

var { Link } = require("../UI/UI.jsx")
// const { getUsername } = require('./ajaxCalls.jsx')

var MenuLink = (props) => {
	return (
		<div className="menu-link" onClick={props.onClick}>
			<img src={props.src} atl="icon"/>
			<Link to={props.URL}>{props.children}</Link>
		</div>
	)
}

var HeaderDropdown = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.getUsername(this.props.dispatch, this.props.MASASuser)
	},

	componentWillReceiveProps: function(nextProps) {
		this.props.getUsername(this.props.dispatch, this.props.MASASuser)
	},

	logout: function() {
		console.log('logging out')
		this.props.logout()
	},

	render: function() {
		if (this.props.MASASuser) {
			return (
				<div className="dropdown--wrapper">
					<div className="username--wrapper">
						<img src={"graph.facebook.com/v2.5/" + FB.getUserId() + "/picture?width=50"} alt="profile picture" className="profile-picture"/>
						<span className="username" id="username-header">{this.props.userData.user}</span>
					</div>
					<div className="dropdown-content">
						<MenuLink src='/static/img/MASAS_play_number.svg' URL="/profile">My Profile</MenuLink>
						<hr />
						<MenuLink src='/static/img/MASAS_logo_world.svg' URL="/">Legals</MenuLink>
						<hr />
						<MenuLink src='/static/img/MASAS_settings.svg' URL="/">Account Settings</MenuLink>
						<hr />
						<MenuLink src='/static/img/MASAS_icon_log_out.svg' URL="/" onClick={this.logout}>Sign out</MenuLink>
					</div>
				</div>
			)
		} else
			return (
				<div className="dropdown--wrapper" >
					<Link to="/login" ref="loginLink"><span className="username login">Log In</span></Link>
				</div>
				)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderDropdown)