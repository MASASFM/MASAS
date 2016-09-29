var React = require("react")


var MiniProfile = (props) => {
	if(props.userInfo)
		return (
			<div className="mini-profile--wrapper">
				{ props.userInfo.username }
			</div>
		)
	else
		return (
			<div className="mini-profile--wrapper">
				Loading user info...
			</div>
		)
}

MiniProfile.PropTypes = {
	userInfo: React.PropTypes.object,
}



module.exports = MiniProfile
