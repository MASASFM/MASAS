var React = require("react")
var ReactDOM = require("react-dom")

var { Link } = require("../../containers/UI/UI.jsx")

var MenuLink = (props) => {
	return (
		<div className="menu-link" onClick={props.onClick}>
			<img src={props.src} atl="icon"/>
			<Link to={props.URL}>{props.children}</Link>
		</div>
	);
}

var HeaderDropdown = React.createClass({
	propTypes: {
		caps: React.PropTypes.bool,				// should button text be in all caps
		white: React.PropTypes.bool,				// should button text be in all caps
	},

	getInitialState: function() {
		return {
			username: "",
		}
	},

	componentWillMount: function() {
	},

	logout: function() {
		this.props.logout()
	},

	getUsername: function() {
		var header = "Bearer " + this.props.MASASuser
		$.ajax({
			type: "GET",
			url: 'api/check-user/',	
			headers: {
				"Authorization": header,
			},
			success: (data) => {
				console.log(data)
				var username = data.user
				if (username.length > 13)
					username = username.substr(0,13) + "..."

				document.getElementById('username-header').innerHTML = username
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	render: function() {
		// this.getUsername()
		if (this.props.MASASuser) {
			return (
				<div className="dropdown--wrapper">
					<div className="username--wrapper">
						<img src="/static/img/menupicture.jpg" alt="profile picture" className="profile-picture"/>
						<span className="username" id="username-header">{this.getUsername()}</span>
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
				<div className="dropdown--wrapper">
					<Link to="/login"><span className="username">Log In</span></Link>
				</div>
				)
	}
});

module.exports = HeaderDropdown