var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/NavSidebar.jsx")

var { Link } = require("../UI/UI.jsx")
var { goToURL } = require("../../MASAS_functions.jsx")

var SplashScreen = require("../App/SplashScreen.jsx")
import Sidebar from "react-sidebar"


var NavSidebar = React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		navSiderbarOpen: React.PropTypes.bool.isRequired,
		MASASuser: React.PropTypes.string.isRequired,
		userData: React.PropTypes.object.isRequired,
		toogleSidebar: React.PropTypes.func.isRequired,
		logout: React.PropTypes.func.isRequired,

		toogleModal: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		closeModal: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	goToProfile: function() {
		goToURL("/profile")
		this.props.toogleSidebar()
	},

	goToLogin: function() {
		this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3)
		this.props.toogleModal()
		this.props.toogleSidebar()
	},

	logout: function() {
		this.props.toogleSidebar()
		this.props.logout()
	},

	render: function() {
		var sidebarContent = <div className="navSidebar--wrapper">
						{ this.props.MASASuser !== "" ?
							<div className="profile-picture--wrapper" onClick={ this.goToProfile }>
								<img src={this.props.userData.avatar_url + "?width=300"}alt="profile-picture" className="profile-picture" />
								<span className="username">{/* this.props.userData.username */}My Profile</span>
							</div>
							:
							<div className="profile-picture--wrapper" onClick={ this.goToLogin }>
								<span className="username">Login</span>
							</div>
						}
						<div className="content">
							<div className="nav-links">
								<div className="link">
									<Link to="/" onClick={this.props.toogleSidebar}>
										{ /* <img src="/static/img/MASAS_logo-M.svg" alt="radio icon" /> */}
										home
									</Link>
								</div>
								<div className="link">
									<Link disabled={true}>
										{ /* <img src="/static/img/MASAS_icon_Radio.svg" alt="radio icon" />*/}
										popular
									</Link>
								</div>
								<div className="link">
									<Link to='/discover' disabled={ false } onClick={this.props.toogleSidebar}>
										{ /* <img src="/static/img/MASAS_icon_Discover.svg" alt="radio icon" />*/}
										discover
									</Link>
								</div>
								<div className="link">
									<Link disabled={ !this.props.MASASuser ? true : false } to="/upload" onClick={this.props.toogleSidebar}>
										{ /* <img src="/static/img/MASAS_icon_Upload.svg" alt="radio icon" />*/}
										upload
									</Link>
								</div>
								<div className="link">
									<Link disabled={ !this.props.MASASuser ? true : false } to="/likes" onClick={this.props.toogleSidebar}>
										{ /* <img src="/static/img/MASAS_liked.svg" alt="radio icon" />*/}
										likes
									</Link>
								</div>
							</div>
							<div className="navSidebar-footer">
								<Link to="/legals" onClick={this.props.toogleSidebar}>Legals</Link>
								<Link disabled={true}>Settings</Link>
								{ this.props.MASASuser ?
									<Link to="/" onClick={this.logout}>Logout</Link>
									:
									<Link to="/login" onClick={this.props.toogleSidebar}>Login</Link>
								}
							</div>
						</div>
					</div>

		const navBarStylesOverride = {
			root: {
				overflow: 'hidden',
			},
			sidebar: {
				zIndex: 12,
			},
			content: {
				overflow: 'hidden',
			},
			overlay: {
				zIndex: 11,
			},
			dragHandle: {
				zIndex: 3,
			}
		}

		return (
			<Sidebar sidebar={sidebarContent}
				open={this.props.navSiderbarOpen}
				onSetOpen={this.props.toogleSidebar}
				styles={navBarStylesOverride}
				touchHandleWidth={20}>
				{this.props.children}
			</Sidebar>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(NavSidebar)
