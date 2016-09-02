var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Likes.jsx")

var LikesWrapper = require("./LikesWrapper.jsx")
var LikesArtworks = require("./LikesArtworks.jsx")
var { Textbox, Button } = require("../UI/UI.jsx")
var FiltersModal = require("./FiltersModal.jsx")
var InfiniteScroll = require('react-infinite-scroll')(React)

var { isSubsequence } = require("../../MASAS_functions.jsx")

var Likes = React.createClass({
	propTypes: {
		SCinfo: React.PropTypes.array,
		userData: React.PropTypes.object,
		searchInput: React.PropTypes.string,
		toogleModal: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		toggleHashtag: React.PropTypes.func,
		hashtagFilter: React.PropTypes.array,
		updateLikes: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		toogleHashtag: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.props.updateTitle("Likes", "0")		// 0 = menu icon; 1 = arrow back

		this.getLikes()
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
		for(var i = 0; i < this.props.hashtagFilter.length; i++) {
			if(this.props.hashtagFilter[i])
				this.props.toogleHashtag(i)
		}
	},

	getLikes: function() {
		if(typeof(this.props.userData.likes) !== "undefined") {
			var idString = this.props.userData.likes.map((like) => {return like.song.SC_ID}).join()
			SC.get("tracks", {limit: this.props.userData.likes.length, ids: idString}).then( (response) => {
				this.props.updateLikes(response)
			})
		} else {
			this.props.updateLikes([])
		}
	},

	componentDidUpdate(prevProps, prevState) {
		if(JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData))
			this.getLikes()
	},

	filterLikes: function() {
		if(this.props.SCinfo.length) {
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

			// filter out zeros
			songList = songList.filter((a) => a !== 0)

			// sort by uploaded time
			songList.sort((a,b) => { return Date.parse(a[0][0].created) < Date.parse(b[0][0].created) })

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

			// filter by hashtags
			var testVar = this.props.hashtagFilter.filter((hashtag) => {
				return hashtag
			})

			if(testVar.length !== 0) {
				for(var i = 0; i < this.props.hashtagFilter.length; i++) {
					if(!this.props.hashtagFilter[i]) {
						filteredSongList = filteredSongList.filter((song) => {
							var timeIntervalURL = song[0][0].song.timeInterval
							var hashtagNumber = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
							return parseInt(hashtagNumber) - 1 !== i
						})
					}
				}
			}

			// ony keep SC data
			filteredSongList = filteredSongList.map((song) => song[1])

			return filteredSongList
		} else 
			return
	},

	openFiltersModal: function() {
		this.props.updateModalContent(<FiltersModal />)
		this.props.toogleModal()
	},

	toggleFilter: function(hashtagNumber) {
		this.props.toogleHashtag(hashtagNumber)
	},

	updateSearchInput: function(searchInput) {
		this.props.updateSearchInput(searchInput)
	},

	render: function() {
		console.log(this.props.SCinfo)
		return (
			<LikesWrapper>
					<div className="likes-searchbar--wrapper" id="likes-searchbar-wrapper">
						<img src="/static/img/MASAS_search.svg" alt="serach-icon" />
						<Textbox id="likes--search-textbox" value={ this.props.searchInput } onChange={ this.updateSearchInput } />
						<img onClick={ this.openFiltersModal } className="filter-icon" alt="filter-songs" src="/static/img/MASAS_icon_trash.svg" />
					</div>
					<div className="filters--wrapper">
						<div onClick={ this.toggleFilter.bind(this, 0) } id="filter-early-morning" className={ "tag-filter " + ( this.props.hashtagFilter[0] ? "enable" : "" )}>#EarlyMorning</div>
						<div onClick={ this.toggleFilter.bind(this, 1) } id="filter-late-morning" className={ "tag-filter " + ( this.props.hashtagFilter[1] ? "enable" : "" )}>#LateMorning</div>
						<div onClick={ this.toggleFilter.bind(this, 2) } id="filter-early-afternoon" className={ "tag-filter " + ( this.props.hashtagFilter[2] ? "enable" : "" )}>#EarlyAfternoon</div>
						<div onClick={ this.toggleFilter.bind(this, 3) } id="filter-late-afternoon" className={ "tag-filter " + ( this.props.hashtagFilter[3] ? "enable" : "" )}>#LateAfternoon</div>
						<div onClick={ this.toggleFilter.bind(this, 4) } id="filter-early-evening" className={ "tag-filter " + ( this.props.hashtagFilter[4] ? "enable" : "" )}>#EarlyEvening</div>
						<div onClick={ this.toggleFilter.bind(this, 5) } id="filter-late-evening" className={ "tag-filter " + ( this.props.hashtagFilter[5] ? "enable" : "" )}>#LateEvening</div>
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







