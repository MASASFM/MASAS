var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Header.jsx")

var Radium = require("radium")

var {goToURL} = require("../../MASAS_functions.jsx")
var Header = require("../Header/Header.jsx")
var HeaderDropdown = require("./HeaderDropdown.jsx")
var Link = require("../UI/Link.jsx")

var Header = React.createClass({

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
							<div className="header-link"><Link to="/discover" disabled={ this.props.user ? false : true }>Discover</Link></div>
							<div className="header-link"><Link to="/" disabled={true}>Popular</Link></div>
							<div className="header-link"><Link to="/upload" disabled={this.props.user ? false : true}>Upload</Link></div>
							<div className="header-link"><Link to="/likes" disabled={this.props.user ? false : true}>Likes</Link></div>
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
								<img onClick={ () => { this.props.backArrowFunc() } } src="/static/img/MASAS_arrow_left.svg" atl="back" className="menu-icon"/>
							}
						</div>
					</div>
					<div className="col-xs-6">
						<div className="box title">{ this.props.pageTitle }</div>
					</div>
					<div className="col-xs-3">
						<div className="box tray-icon--wrapper">
							<div 
								className={ "toogle-open-tray-icon " + (this.props.isPlayerBarOpened ? "opened" : "") } 
								onClick={ this.props.songPlaying ? this.props.toogleIsOpened : () => {} } 
								style={ !this.props.songPlaying ? { opacity: 0.7, cursor: 'default' } : {} } >
							</div>
						</div>
					</div>
				</div>
			</nav>
		)
	}
})

var styles = {
	headerContainer: {
		border: 'solid 1px black',
		height: '3rem',
		backgroundColor: 'rgba(0,0,0,0.7)',
		color: 'white',
		margin: 0
	},

	desktopHeaderBar: {
		visibility: 'hidden',

		'@media (min-width: 700px)': {
			visibility: 'visible'
		}
	},

	smartphoneHeaderBar: {
		'@media (min-width: 700px)': {
			visibility: 'hidden'
		}
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
