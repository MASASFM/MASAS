'use strict';

var React = require('react')
var ReactDOM = require('react-dom')

var test = React.createClass({
    render: function() {
        return (
            React.createElement("h1", null, "heyyyyooo")
        )
        }
    });

ReactDOM.render(
    React.createElement(test, null),
    document.getElementById('content')
);
