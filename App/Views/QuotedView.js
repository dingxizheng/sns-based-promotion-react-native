/* 
* @Author: dingxizheng
* @Date:   2016-02-06 20:15:00
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-06 21:14:54
*/

'use strict';

var React       = require('react-native');
var theme       = require('../theme');

var {
	View, 
	StyleSheet, 
} = React;

var QuotedView = React.createClass({

	render: function() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this.props.children}
			</View>
		);
	}

});

var styles = StyleSheet.create({
	container: {
		borderLeftColor: theme.colors.MAIN,
		borderLeftWidth: 2,
		padding: 5,
		backgroundColor: '#f5f5f5'
	}
});

module.exports = QuotedView;