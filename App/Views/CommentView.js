/* 
* @Author: dingxizheng
* @Date:   2016-01-31 18:56:08
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-31 20:50:33
*/

'use strict';

var React = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var BlurView    = require('react-native-blur').BlurView;
var Icon        = require('react-native-vector-icons/MaterialIcons');
var theme = require('../theme');

var {View, Text, StyleSheet, TouchableOpacity, Image} = React;

var Comment = React.createClass({
	render: function() {
		var {avatar, body, name, time} = this.props.comment;

		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.avatarWrapper}>
					<Image
						source={{ uri: avatar }} 
						style={styles.avatar}/>
				</TouchableOpacity>
				<View style={styles.contentWrapper}>
					<TouchableOpacity style={styles.profileInfo}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.profileTime}>{time}</Text>
					</TouchableOpacity>
					<View style={styles.commentContent}>
						<Text style={styles.commentContentText}>{body}</Text>
					</View>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		borderBottomColor: '#eeeeee',
		borderBottomWidth: .5

	},
	avatarWrapper: {
		marginRight: 10,
	},
	avatar: {
		height: 30,
		width: 30,
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 15,
	},
	contentWrapper: {
		flex: 1,
		flexDirection: 'column'
	},
	commentContent: {
		
	},
	commentContentText: {
		color: theme.colors.GREY_FONT,
		fontWeight: theme.fonts.FONT_WEIGHT,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	profileInfo: {
		// paddingLeft: 10,
		// height: 30,
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 5
		// alignItems: 'center'
	},
	profileName: {
		flex: 0.7,
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	profileTime: {
		textAlign: 'right',
		flex: 0.3,
		color: theme.colors.GREY_FONT,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
});

module.exports = Comment;