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
		return <div className="link-icon"><a href={ url } target="_blank">{ checkVar }</a></div>
	} else
		return ""
}

LinkIcon.propTypes = {
	url: React.PropTypes.string, 						// url 
}

var MiniProfile = (props) => {
	var viewContent = "Loading user info..."

	if(props.userInfo) {
		// https://facebook.github.io/react/docs/lists-and-keys.html#keys
		// We don't recommend using indexes for keys if the items can reorder, 
		// as that would be slow. You may read an in-depth explanation about why 
		// keys are necessary if you're interested.

		// indexes are used as keys because links don't expect to be reordered
		// this prevents keys from overlapping if for some reason link repeat in link_set
		var linkSet = props.userInfo.link_set.map( (link_set, index) => <LinkIcon url={ link_set.link } key={ index } /> )

		const str = props.userInfo.url
		const userPk = str.slice(str.slice(0,str.lastIndexOf('/')).lastIndexOf('/')+1,str.lastIndexOf('/'))

		viewContent = (
				<div className="mini-profile--wrapper2">
					<img onClick={ () => browserHistory.push('/user/' + userPk)  } src={ props.userInfo.avatar_url + "?width=300" } alt="artist avatar" className="artist-avatar" />
					<div className="profile-info">
						<span onClick={ () => browserHistory.push('/user/' + userPk)  } className="username">{ props.userInfo.name ? props.userInfo.name : props.userInfo.username }</span>

						<div className="occupation">
							{ 
								props.userInfo.occupation ?
									<div>{ props.userInfo.occupation }</div>
								:
									""
							}
						</div>
						<div className="location">
							<span className="city">
								{ 
									props.userInfo.city ?
										<div>{ props.userInfo.city.display_name.substring(0, props.userInfo.city.display_name.indexOf(',')) + " - " + props.userInfo.city.display_name.substring(props.userInfo.city.display_name.lastIndexOf(',') + 1, props.userInfo.city.display_name.length) }</div>
									:
										""
								}
							</span>
						</div>

						<div className="social-icons">
						{ 
							linkSet	
						}	
						</div>
					</div>
				</div>
		)
	}

	return (
		<div className={ "mini-profile--wrapper" + ( props.isMiniProfileBig ? " large" : "") }>
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
