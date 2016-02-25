
/* @flow */
'use strict';

var React = require('react-native');

var {
    Navigator,
    StyleSheet,
    View,
} = React;

var NavBar = React.createClass({

    getInitialState: function() {
        return {
            props: null,
        };
    },
    
    render: function() {
        console.log(this.props);
        return (
            <Navigator.NavigationBar {...this.props} style={[this.props.style]}/>
        );
    }
});


var styles = StyleSheet.create({

});


module.exports = NavBar;
