var React = require("react")
var ReactDOM = require("react-dom")

var {goToURL} = require("../../../MASAS_functions.jsx")

var Button = require("../../containers/UI/Button.jsx")
var Link = require("../../containers/UI/Link.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")


var Home = React.createClass({
	componentWillUnmount: function () {
		this.goToPage1()
	},

	goToPage1: function() {
		console.log('GOTO PAGE 1')
		document.getElementById('homepage-login').className = 'page1--wrapper'
		document.getElementById('homepage-description--choose').className='page2--wrapper'
		document.getElementById('homepage-description--artist').className='page2--wrapper'
		document.getElementById('homepage-description--musicLover').className='page2--wrapper'
		document.getElementsByClassName('body--background')[0].className = 'body--background'
	},

	goToPage2: function() {
		console.log('GOTO PAGE 2')
		document.getElementById('homepage-login').className = 'page2--wrapper'
		document.getElementById('homepage-description--artist').className='page2--wrapper'
		document.getElementById('homepage-description--musicLover').className='page2--wrapper'
		document.getElementById('homepage-description--choose').className='page1--wrapper'
		document.getElementsByClassName('body--background')[0].className = 'body--background blurred'
	},

	goToPageArtist: function() {
		console.log('GOTO PAGE ARTIST')
		document.getElementById('homepage-login').className = 'page2--wrapper'
		document.getElementById('homepage-description--choose').className='page2--wrapper'
		document.getElementById('homepage-description--musicLover').className='page2--wrapper'
		document.getElementById('homepage-description--artist').className='page1--wrapper'
		document.getElementsByClassName('body--background')[0].className = 'body--background blurred saturated'
	},

	gotToPageMusicLover: function() {
		
		console.log('GOTO PAGE MUSIC LOVER')
		document.getElementById('homepage-login').className = 'page2--wrapper'
		document.getElementById('homepage-description--choose').className='page2--wrapper'
		document.getElementById('homepage-description--artist').className='page2--wrapper'
		document.getElementById('homepage-description--musicLover').className='page1--wrapper'
		document.getElementsByClassName('body--background')[0].className = 'body--background blurred saturated'
	},

	render: function() {
		return (
			<div className="home--wrapper">
				<div className="multiPage--wrapper">
					<div className="page1--wrapper" id="homepage-login">
						<div className="logo">
							<HomeCountdown user={this.props.user}/>
						</div>
						<div className="login-container" style={{display: 'none'}}>
							<Button onClick={goToURL.bind(null, 'login')} caps={true}>log-in</Button>
							<br />
							<Link to="/sign-up" className="signup-text">Sign up</Link>
						</div>
						<img onClick={this.goToPage2} src="/static/img/puff_loader_slow.svg" alt="down arrow" className="arrow-icon"/>
					</div>
					<div className="page2--wrapper" id="homepage-description--choose">
						<h1 onClick={this.goToPage1}>it's all about you...</h1>
						<div className="links--wrapper">
							<img onClick={this.goToPageArtist} src="/static/img/homepage/picto_artist.png" alt="I'm an artist" />
							<img onClick={this.gotToPageMusicLover} src="/static/img/homepage/picto_musicLover.png" alt="I'm a music lover" />
						</div>
					</div>
					<div className="page2--wrapper" id="homepage-description--artist">
						<div className="artist-page--wrapper">
							<img src="/static/img/homepage/artist_deco2.png" alt="website screenshot" />
						</div>
						<div className="text--wrapper">
							<img src="/static/img/homepage/artist_deco1.png" alt="website screenshot" />
							<h1 onClick={this.goToPage1}>i'm an artist</h1>
							<p>
								Music transcends the boundaries of language and culture, it is a beautiful outburst of the soul that brings joy and happiness; and this is exactly why you should share yours. Plus, you know, music lovers from all over the world will listen to you music.
							</p>
							<div className="button">
								{ this.props.user ?
									<Button onClick={goToURL.bind('null', '/sc-sync')}>Start Uploading</Button>
								:
									<Button onClick={goToURL.bind('null', '/login')}>Get Early Access</Button>
								}
							</div>
						</div>
					</div>
					<div className="page2--wrapper" id="homepage-description--musicLover">
						<div className="artist-page--wrapper">
							<img src="/static/img/homepage/musicLover_deco2.png" alt="website screenshot" />
						</div>
						<div className="text--wrapper">
							<img src="/static/img/homepage/musicLover_deco1.png" alt="website screenshot" />
							<h1 onClick={this.goToPage1}>i'm a music lover</h1>
							<p>
								Music has a universal capacity to positively influence our moods in the midst of our daily routine. Music is incredible, but it is even better when we share it together. On MASAS, everyone collaborates together to Discover new tunes and create a better Radio.
							</p>
							<div className="button">
								{ this.props.user ?
									<Button onClick={goToURL.bind('null', '/profile')}>My Profile</Button>
								:
									<Button onClick={goToURL.bind('null', '/login')}>Get Early Access</Button>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Home