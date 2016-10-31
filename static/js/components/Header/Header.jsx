var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Header.jsx")

// var { goToURL } = require("../../MASAS_functions.jsx")
var HeaderDropdown = require("./HeaderDropdown.jsx")
var Link = require("../UI/Link.jsx")
var { Button } = require("../UI/UI.jsx")
var { browserHistory } = require('react-router')

var Header = React.createClass({
	propTypes: {
		pageType: React.PropTypes.number,
		pageTitle: React.PropTypes.string,
		user: React.PropTypes.string,
		isPlayerBarOpened: React.PropTypes.bool,
		backArrowFunc: React.PropTypes.func,
		notificationText: React.PropTypes.string,
		isAppFetching: React.PropTypes.bool,
		songPlaying: React.PropTypes.string,
		MASASuser: React.PropTypes.string,
		// isModalOpened: React.PropTypes.bool,
		// toogleModal: React.PropTypes.func,
		// updateModalContent: React.PropTypes.func,

		onSetNavSidebarOpen: React.PropTypes.func,
		toogleIsOpened: React.PropTypes.func,
		goToHomepageSlide1: React.PropTypes.func,
		closeModal: React.PropTypes.func,
	},

	render: function() {
		return (
			<nav  className="header">
				<div className="ajax-loader--wrapper">
					<div className={ "ajax-loader" + (this.props.isAppFetching ? " visible" : "") }>
					</div>
				</div>
				<div className="notification--wrapper1">
					{
						this.props.notificationText !== "" ?
							<div className="notification--wrapper2">
								<div className="notification-text" id="notification-text">
									{ this.props.notificationText }
								</div>
							</div>
						:
							""
					}
				</div>
				<div className="top-decoration--top-border">
				</div>
				<div className="top-decoration">
				</div>
				<div className="row middle-xs desktop-header">
					<div className="col-xs-10 links--wrapper">
						<Link to="/" className="logo" onClick={this.props.goToHomepageSlide1}>
							<img src="/static/img/navlogo.png" alt="MASAS" className="logo" />
						</Link>
						<div className="box" style={{display: 'flex', flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
							<div className="header-link"><Link onClick={ this.props.closeModal } to="/discover" disabled={ false }>Discover</Link></div>
							<div className="header-link"><Link onClick={ this.props.closeModal } to="/popular" disabled={false}>Popular</Link></div>
							<div className="header-link"><Link onClick={ this.props.closeModal } to="/upload" disabled={false}>Upload</Link></div>
							<div className="header-link"><Link onClick={ this.props.closeModal } to="/likes" disabled={this.props.user ? false : true}>Likes</Link></div>
							<div className="header-link" style={{ display: 'none', minWidth: 0.1 }}>
								<img src="/static/img/MASAS_search.svg" alt="search" className="search-icon"/>
							</div>
						</div>
						<HeaderDropdown />
					</div>
				</div>
				<div className="row middle-xs phone-header">
					<div className="col-xs-3">
						<div className="box">
							{ this.props.pageType === 0 ?
								<img onClick={this.props.onSetNavSidebarOpen} src="/static/img/MASAS_hamburger_menu.svg" atl="menu" className="menu-icon"/>
								:
								<img onClick={ () => { this.props.backArrowFunc(); this.props.closeModal() } } src="/static/img/MASAS_arrow_left.svg" atl="back" className="menu-icon"/>
							}
						</div>
					</div>
					<div className="col-xs-6">
						{ this.props.MASASuser === "" ?
							<div></div>
							:
							<div className="box title">{ this.props.pageTitle }</div>
						}
					</div>
					<div className="col-xs-3">
						<div className="box tray-icon--wrapper">
							
								<div 
									className={ "toogle-open-tray-icon " + (this.props.isPlayerBarOpened ? "opened" : "") } 
									onClick={ this.props.songPlaying ? this.props.toogleIsOpened : () => {} } 
									style={ !this.props.songPlaying ? { opacity: 0, cursor: 'default' } : {} } >
								</div>
							
						</div>
					</div>
				</div>
			</nav>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
