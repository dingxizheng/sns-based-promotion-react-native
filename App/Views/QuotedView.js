/* 
* @Author: dingxizheng
* @Date:   2016-02-06 20:15:00
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-29 17:12:58
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
		borderLeftColor: '#ddd',
		borderLeftWidth: 2,
		paddingTop: 0,
		paddingBottom: 0,
		backgroundColor: '#f5f5f5'
	}
});

module.exports = QuotedView;