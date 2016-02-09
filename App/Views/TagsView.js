/* 
* @Author: dingxizheng
* @Date:   2016-02-08 17:22:39
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-08 19:49:39
*/

'use strict';

var React       = require('react-native');
var theme       = require('../theme');
var Icon        = require('react-native-vector-icons/FontAwesome');

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

var TagsView = React.createClass({

	_renderTagItem: function(tag) {
		return <View style={styles.tagItem}>
					<Text style={styles.tagItemText}>#{tag}</Text>
			   </View>;
	},

	render: function() {
		var tags = this.props.tags || [];
		var maxNumber = this.props.maxNumber || 5;
		return (
			<View style={styles.container}>
				{tags.map(function(tag){
					return this._renderTagItem(tag);
				}.bind(this))}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tagItem: {
		// borderWidth: .5,
		// borderColor: theme.colors.MAIN,
		borderRadius: 2,
		backgroundColor: '#eeeeee',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 2,
		marginBottom: 2
	},
	tagItemText: {
		color: theme.colors.MAIN,
	    fontSize: 11,
	    padding: 2,
	    paddingLeft: 4,
	    paddingRight: 4
	}
});

module.exports = TagsView;