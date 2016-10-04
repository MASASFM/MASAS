var React = require("react")
var { browserHistory } = require("react-router")


var LinkIcon = props => {
	const url = props.url
	const checkURL = (type) => url.includes(type)
	
	var checkVar = false

	if(checkURL('facebook.com'))
		checkVar = <img src="/static/img/facebook.svg" alt="masas profile" />
	else if(checkURL('twitter.com'))
		checkVar = <img src="/static/img/twitter.svg" alt="masas profile" />
	else if(checkURL('soundcloud.com'))
		checkVar = <img src="/static/img/MASAS_logo_soundcloud.svg" alt="masas profile" />
	else if(!url.includes("facebook.com") && !url.includes("twitter.com") && !url.includes("soundcloud.com"))
		checkVar = <img src="/static/img/MASAS_logo_world.svg" alt="masas profile" />

	if(checkVar) {
		return <div className="link-icon"><a href={ url }>{ checkVar }</a></div>
	} else
		return ""
}

LinkIcon.propTypes = {
	url: React.PropTypes.string, 						// url 
}

var MiniProfile = (props) => {
	var viewContent = "Loading user info..."


	if(props.userInfo) {
		var linkSet = props.userInfo.link_set.map( ({ link }) => <LinkIcon url={ link  } /> )
		const str = props.userInfo.url
		const userPk = str.slice(str.slice(0,str.lastIndexOf('/')).lastIndexOf('/')+1,str.lastIndexOf('/'))

		viewContent = (
				<div className="mini-profile--wrapper2">
					<img onClick={ () => browserHistory.push('/user/' + userPk)  } src={ props.userInfo.avatar_url + "?width=300" } alt="artist avatar" className="artist-avatar" />
					<span onClick={ () => browserHistory.push('/user/' + userPk)  } className="username">{ props.userInfo.name ? props.userInfo.name : props.userInfo.username }</span>
					<div className="social-icons">
					{ 
						linkSet	
					}	
					</div>
				</div>
		)
	}

	return (
		<div className={ "mini-profile--wrapper" + ( props.isMiniProfileBig ? " large" : "") }>
			<div className="back-arrow">
				<img src="/static/img/MASAS_arrow_left.svg" alt="back button"  onClick={ props.backArrowFunc } />
			</div>

			{ viewContent }
		</div>
	)
}

MiniProfile.propTypes = {
	userInfo: React.PropTypes.object,
	backArrowFunc: React.PropTypes.func,
	isMiniProfileBig: React.PropTypes.bool,
}

MiniProfile.defaultProps = {
	isMiniProfileBig: false,
}

module.exports = MiniProfile
