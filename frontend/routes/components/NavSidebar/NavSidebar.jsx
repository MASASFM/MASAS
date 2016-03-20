var React = require("react")
var ReactDOM = require("react-dom")

// var {getCookie} = require("../../../MASAS_functions.jsx")
var { Textbox, Link } = require("../../containers/UI/UI.jsx")
var {goToURL} = require("../../../MASAS_functions.jsx")

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

	render: function() {
		var sidebarContent = <div className="navSidebar--wrapper">
						<div className="profile-picture--wrapper" onClick={ this.goToProfile }>
							<img src="/static/img/menupicture.jpg" alt="profile-picture" className="profile-picture" />
							<span className="username">Thomas Binétruy</span>
						</div>
						<div className="content">
							<div className="search-input">
								<Textbox />
							</div>
							<div className="nav-links">
								<div className="link">
									<Link disabled={true}>
										<img src="/static/img/MASAS_icon_Radio.svg" alt="radio icon" />
										radio
									</Link>
								</div>
								<div className="link">
									<Link disabled={true}>
										<img src="/static/img/MASAS_icon_Discover.svg" alt="radio icon" />
										discover
									</Link>
								</div>
								<div className="link">
									<Link disabled={ !this.props.MASASuser ? true : false } to="sc-sync" onClick={this.props.toogleSidebar}>
										<img src="/static/img/MASAS_icon_Upload.svg" alt="radio icon" />
										upload
									</Link>
								</div>
								<div className="link">
									<Link disabled={ !this.props.MASASuser ? true : false } to="likes" onClick={this.props.toogleSidebar}>
										<img src="/static/img/MASAS_liked.svg" alt="radio icon" />
										likes
									</Link>
								</div>
							</div>
							<div className="navSidebar-footer">
								<Link to="/" onClick={this.props.toogleSidebar}>Legals</Link>
								<Link disabled={true}>Settings</Link>
								{ this.props.MASASuser ?
									<Link to="/" onClick={this.props.logout}>Logout</Link>
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
					// overflow: 'hidden',
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
					// overflow: 'auto',
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
				touchHandleWidth={40}>
				{this.props.children}
			</Sidebar>
		)
	}
});

module.exports = NavSidebar