var React = require("react")
var { browserHistory } = require("react-router")



var MiniProfile = (props) => {
	var viewContent = "Loading user info..."
	if(props.userInfo) {
		const str = props.userInfo.url
		const userPk = str.slice(str.slice(0,str.lastIndexOf('/')).lastIndexOf('/')+1,str.lastIndexOf('/'))

		viewContent = (
				<div className="mini-profile--wrapper2">
					<img onClick={ () => browserHistory.push('/user/' + userPk)  } src={ props.userInfo.avatar_url } alt="artist avatar" className="artist-avatar" />
					<span onClick={ () => browserHistory.push('/user/' + userPk)  } className="username">{ props.userInfo.name ? props.userInfo.name : props.userInfo.username }</span>
					<div className="social-icons">
						<div  className="link-icon">
							<img onClick={ () => {} } src="/static/img/twitter.svg" alt="masas profile" />
						</div>
						<div className="link-icon">
							<img onClick={ () => {} } src="/static/img/facebook.svg" alt="masas profile" />
						</div>
						<div className="link-icon">
							<img onClick={ () => {} } src="/static/img/MASAS_logo_world.svg" alt="masas profile" />
						</div>
					</div>
				</div>
		)
	}

	return (
		<div className="mini-profile--wrapper">
			<div className="back-arrow">
				<img src="/static/img/MASAS_arrow_left.svg" alt="back button"  onClick={ props.backArrowFunc } />
			</div>

			{ viewContent }
		</div>
	)
}

MiniProfile.PropTypes = {
	userInfo: React.PropTypes.object,
	backArrowFunc: React.PropTypes.func,
}



module.exports = MiniProfile
