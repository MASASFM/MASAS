var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Likes.jsx")

var LikesWrapper = require("./LikesWrapper.jsx")
var LikesItem = require("./LikesItem.jsx")
var LikesArtworks = require("./LikesArtworks.jsx")
var { Textbox } = require("../UI/UI.jsx")
var FiltersModal = require("./FiltersModal.jsx")

var { isSubsequence } = require("../../MASAS_functions.jsx")

var Likes = React.createClass({
	propTypes: {
		SCinfo: React.PropTypes.array,
		userData: React.PropTypes.object,
		searchInput: React.PropTypes.string,
		toogleModal: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.props.updateTitle('Likes', '0')		// 0 = menu icon; 1 = arrow back

		this.getLikes()
	},

	componentDidMount: function() {
	},

	getLikes: function() {
		// console.log('no way')
		if(typeof(this.props.userData.likes) !== "undefined") {
			var idString = this.props.userData.likes.map((like) => {return like.song.SC_ID}).join()
			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				// console.log(response)
				// this.setState({userInfo: data, userSCSongs: response})
				this.props.updateLikes(response)
			})
		} else {
			this.props.updateLikes(null)
		}
	},

	componentDidUpdate(prevProps, prevState) {
		if(JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData))
			this.getLikes()
	},

	filterLikes: function() {
		if(this.props.SCinfo !== null) {
			var songs = this.props.SCinfo
			var songList =  songs.map((song) => { 
				var MASAS_songInfo = this.props.userData.likes.filter((like) => {
					return like.song.SC_ID === song.id
				})

				if(MASAS_songInfo.length === 1)
					return [MASAS_songInfo, song]
				else
					return 0
			})

			var radioTimeString = (timeIntervalURL) => {
				var switchVar = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
			
				switch(switchVar) {
					case "1":
						return "#EarlyMorning"
					case "2":
						return "#LateMorning"
					case "3":
						return "#EarlyAfternoon"
					case "4":
						return "#LateAfternoon"
					case "5":
						return "#EarlyEvening"
					case "6":
						return "#LateEvening"
					default:
						return 
				}
			}

			var filteredSongList = songList.filter((song) => {
				if(song === 0)
					return false

				var songSearchString = radioTimeString(song[0][0].song.timeInterval) + " " + song[1].title + " " + song[1].tag_list

				return isSubsequence(this.props.searchInput, songSearchString)
			})

			// ony keep SC data
			filteredSongList = filteredSongList.map((song) => song[1])

			return filteredSongList
		} else 
			return
	},

	openFiltersModal: function() {
		console.log(FiltersModal)
		this.props.updateModalContent(<FiltersModal />)
		this.props.toogleModal()
	},

	render: function() {
		// console.log("PROPS => ", this.props)
		return (
			<LikesWrapper>
				<div className="likes-searchbar--wrapper" id="likes-searchbar-wrapper">
					<img src="/static/img/MASAS_search.svg" alt="serach-icon" />
					<Textbox id="likes--search-textbox" actionString="UPDATE_LIKES_SEARCH_INPUT" actionParamName="input" />
					<img onClick={ this.openFiltersModal } className="filter-icon" alt="filter-songs" src="/static/img/MASAS_icon_trash.svg" alt="select-time" />
				</div>
				<div className="filters--wrapper">
					<div id="filter-early-morning" className="tag-filter">#EarlyMorning</div>
					<div id="filter-late-morning" className="tag-filter enable">#LateMorning</div>
					<div id="filter-early-afternoon" className="tag-filter">#EarlyAfternoon</div>
					<div id="filter-late-afternoon" className="tag-filter">#LateMorning</div>
					<div id="filter-early-evening" className="tag-filter">#EarlyEvening</div>
					<div id="filter-late-evening" className="tag-filter">#LateMorning</div>
				</div>
				<LikesArtworks SCinfo={ this.filterLikes(this.props.SCinfo) } userData={ this.props.userData } />
				
			</LikesWrapper>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Likes)







