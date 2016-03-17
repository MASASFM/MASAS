var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")

var {goToURL} = require("../../../MASAS_functions.jsx")

var Header = require("../../containers/Header/Header.jsx")
var HeaderDropdown = require("../../containers/Header/HeaderDropdown.jsx")
var Link = require("../../containers/UI/Link.jsx")

var Header = React.createClass({
	goToHomepageSlide1: function() {
		// if on homepage, got to first slide
		if(document.getElementById('homepage-login')) {
			console.log('GOTO HOMEPAGE 1')
			document.getElementById('homepage-login').className = 'page1--wrapper'
			document.getElementById('homepage-description--choose').className='page2--wrapper'
			document.getElementById('homepage-description--artist').className='page2--wrapper'
			document.getElementById('homepage-description--musicLover').className='page2--wrapper'
			document.getElementsByClassName('body--background')[0].className = 'body--background'
		}
	},

	render: function() {
		return (
			<nav  className="header">
				<div className="top-decoration--top-border">
				</div>
				<div className="top-decoration">
				</div>
				<div className="row middle-xs desktop-header">
					<div className="col-xs-10 links--wrapper">
						<Link to="/" className="logo" onClick={this.goToHomepageSlide1}>
							<img src="/static/img/navlogo.png" alt="MASAS" className="logo" />
						</Link>
						<div className="box" style={{display: 'flex', flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
							<div className="header-link"><Link to="/" disabled={true}>Discover</Link></div>
							<div className="header-link"><Link to="/" disabled={true}>Radio</Link></div>
							<div className="header-link"><Link to="/sc-sync" disabled={this.props.user ? false : true}>Upload</Link></div>
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