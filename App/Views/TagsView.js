/* 
* @Author: dingxizheng
* @Date:   2016-02-08 17:22:39
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-16 18:40:32
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

	_handleOnPress: function(tag, i) {
		if (tag !== ' ... ' && this.props.onPress) {
			this.props.onPress(tag, i);
		}

		if (tag === ' ... ' && this.props.onMore) {
			this.props.onMore(tag, i);
		}
	},

	_renderTagItem: function(tag, i) {
		return <TouchableOpacity key={i} style={styles.tagItem} onPress={() => this._handleOnPress(tag, i)}>
					<Text style={[styles.tagItemText, this.props.tagStyle]}>{tag === ' ... ' ? '' : '#'}{tag}</Text>
			   </TouchableOpacity>;
	},

	render: function() {
		var tags = this.props.tags || [];
		var maxNumber = this.props.maxNumber || 5;
		if (tags.length > maxNumber) {
			tags = tags.slice(0, maxNumber);
			tags.push(' ... ');
		}
		return (
			<View style={[styles.container, this.props.style]}>
				{tags.map(function(tag, i){
					return this._renderTagItem(tag, i);
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