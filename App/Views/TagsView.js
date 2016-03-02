/* 
* @Author: dingxizheng
* @Date:   2016-02-08 17:22:39
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 16:03:52
*/

'use strict';

var React = require('react-native');
var theme = require('../theme');
var Icon  = require('react-native-vector-icons/FontAwesome');

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

		if (tag === `  ${ this.props.lastButton }  ` && this.props.onLastButton) {
			this.props.onLastButton(tag, i);
		}
	},

	_renderTagItem: function(tag, i) {
		return <TouchableOpacity key={i} style={styles.tagItem} onPress={() => this._handleOnPress(tag, i)}>
					<Text style={[styles.tagItemText, this.props.tagStyle]}>{tag === ' ... ' ? '' : ''}{tag}</Text>
			   </TouchableOpacity>;
	},

	render: function() {
		var tags = this.props.tags || [];
		var maxNumber = this.props.maxNumber || 5;
		if (tags.length > maxNumber) {
			tags = tags.slice(0, maxNumber);
			tags.push(' ... ');
		}

		if (this.props.lastButton) {
			tags = tags.slice(0, maxNumber);
			tags.push(`  ${ this.props.lastButton }  `);
		}

		if (this.props.tags && this.props.tags.length > 0)
			return (
				<View style={[styles.container, this.props.style]}>
					{tags.map(function(tag, i){
						return this._renderTagItem(tag, i);
					}.bind(this))}
				</View>
			);
		else
			return null;
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: -3
	},
	tagItem: {
		height: 20,
		borderWidth: 1,
		borderColor:  '#aaa',
		borderRadius: 10,
		// backgroundColor: '#eeeeee',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 3,
		marginBottom: 3,
		paddingLeft: 8,
		paddingRight: 8
	},
	tagItemText: {
		color: theme.colors.MAIN,
	    fontSize: 11,
	}
});

module.exports = TagsView;