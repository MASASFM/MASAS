var React = require("react")
var ReactDOM = require("react-dom")

var SoundcloudCallback = React.createClass({

	redirect: function() {		
		console.log('hey');
	},

	componentDidMount: function() {
		window.setTimeout(opener.SC.connectCallback, 1);
	},

  render() {
    return (
	      <body onLoad={ this.redirect() }>
		    <b style={{ textAlign: 'center' }}>This popup should automatically close in a few seconds</b>
		  </body>
    );
  }
});

module.exports = SoundcloudCallback