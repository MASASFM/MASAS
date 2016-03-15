
var ReactRedux = require("react-redux")
var Footer = require('../../components/Footer/Footer.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
  	MASASuser: state.appReducer.MASASuser,
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
  	playRandomSong:(songId) => dispatch({ type: 'PLAY_NEW_SONG', song: songId})
  }
}

Footer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
module.exports = Footer
