var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/NavSidebar.jsx")

var { Textbox, Link } = require("../UI/UI.jsx")
var { goToURL } = require("../../MASAS_functions.jsx")

import Sidebar from "react-sidebar"


var NavSidebar = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		// this.props.updateTitle('Template', '0')		// 0 = menu icon; 1 = arrow back
	},

	goToProfile: function() {
		goToURL("/profile")
		this.props.toogleSidebar()
	},

	logout: function() {
		this.props.toogleSidebar()
		this.props.logout()
	},

	render: function() {
		var sidebarContent = <div className="navSidebar--wrapper">
						<div className="profile-picture--wrapper" onClick={ this.goToProfile }>
							<img src={this.props.userData.avatar_url + "?width=300"}alt="profile-picture" className="profile-picture" />
							<span className="username">{this.props.userData.username}</span>
						</div>
						<div className="content">
							<div className="search-input">
								<Textbox />
							</div>
							<div className="nav-links">
								<div className="link">
									<Link to="/" onClick={this.props.toogleSidebar}>
										<img src="/static/img/MASAS_logo-M.svg" alt="radio icon" />
										home
									</Link>
								</div>
								<div className="link">
									<Link disabled={true}>
										<img src="/static/img/MASAS_icon_Radio.svg" alt="radio icon" />
										popular
									</Link>
								</div>
								<div className="link">
									<Link to='/discover' disabled={ !this.props.MASASuser ? true : false } onClick={this.props.toogleSidebar}>
										<img src="/static/img/MASAS_icon_Discover.svg" alt="radio icon" />
										discover
									</Link>
								</div>
								<div className="link">
									<Link disabled={ !this.props.MASASuser ? true : false } to="/upload" onClick={this.props.toogleSidebar}>
										<img src="/static/img/MASAS_icon_Upload.svg" alt="radio icon" />
										upload
									</Link>
								</div>
								<div className="link">
									<Link disabled={ !this.props.MASASuser ? true : false } to="/likes" onClick={this.props.toogleSidebar}>
										<img src="/static/img/MASAS_liked.svg" alt="radio icon" />
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
					// position: 'absolute',
					// top: 0,
					// left: 0,
					// right: 0,
					// bottom: 0,
					overflow: 'hidden',
				},
				sidebar: {
					zIndex: 5,
					// position: 'absolute',
					// top: 0,
					// bottom: 0,
					// transition: 'transform .3s ease-out',
					// WebkitTransition: '-webkit-transform .3s ease-out',
					// willChange: 'transform',
					// overflowY: 'auto',
				},
				content: {
					// position: 'absolute',
					// top: 0,
					// left: 0,
					// right: 0,
					// bottom: 0,
					overflow: 'hidden',
					// transition: 'left .3s ease-out, right .3s ease-out',
				},
				overlay: {
					zIndex: 3,
					// position: 'fixed',
					// top: 0,
					// left: 0,
					// right: 0,
					// bottom: 0,
					// opacity: 0,
					// visibility: 'hidden',
					// transition: 'opacity .3s ease-out',
					// backgroundColor: 'rgba(0,0,0,.3)',
				},
				dragHandle: {
					zIndex: 3,
					// position: 'fixed',
					// top: 0,
					// bottom: 0,
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
