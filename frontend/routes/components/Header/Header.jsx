var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")

var {goToURL} = require("../../../MASAS_functions.jsx")

var Header = require("../../containers/Header/Header.jsx")
var HeaderDropdown = require("../../containers/Header/HeaderDropdown.jsx")
var Link = require("../../containers/UI/Link.jsx")

var Header = React.createClass({
	render: function() {
		return (
			<nav  className="header">
				<div className="top-decoration--top-border">
				</div>
				<div className="top-decoration">
				</div>
				<div className="row middle-xs desktop-header">
					<div className="col-xs-2">
						<div className="box"></div>
					</div>
					<div className="col-xs-2">
						<Link to="/">
							<img src="/static/img/navlogo.png" alt="MASAS" className="logo" />
						</Link>
					</div>
					<div className="col-xs-6">
						<div className="box" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
							<div className="header-link"><Link to="/" disabled={true}>Discover</Link></div>
							<div className="header-link"><Link to="/" disabled={true}>Radio</Link></div>
							<div className="header-link"><Link to="/sc-sync" disabled={this.props.user ? false : true}>Upload</Link></div>
							<div className="header-link"><Link to="/likes" disabled={this.props.user ? false : true}>Likes</Link></div>
							<div className="header-link">
								<img src="/static/img/MASAS_search.svg" alt="search" className="search-icon"/>
							</div>
						</div>
					</div>
					<div className="col-xs-2" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
						<HeaderDropdown />
					</div>
				</div>
				<div className="row middle-xs phone-header">
					<div className="col-xs-3">
						<div className="box">
							{ this.props.pageType == 0 ?
								<img onClick={this.props.onSetNavSidebarOpen} src="/static/img/MASAS_hamburger_menu.svg" atl="menu" className="menu-icon"/>
								:
								<img src="/static/img/MASAS_arrow_left.svg" atl="menu" className="menu-icon"/>
							}
						</div>
					</div>
					<div className="col-xs-6">
						<div className="box title">{ this.props.pageTitle }</div>
					</div>
					<div className="col-xs-3">
						<div className="box"></div>
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

module.exports = Radium(Header)