/* 
* @Author: dingxizheng
* @Date:   2016-02-11 16:11:14
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-28 21:01:14
*/

'use strict';

var React       = require('react-native');
var Actions     = require('react-native-router-flux').Actions;
var theme       = require('../theme');
var moment   = require('moment');
var HTMLView = require('react-native-htmlview');
var ImageGroup  = require('./ImagesView');
var TagsView = require('./TagsView');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var UserCardSmallView = React.createClass({

	getInitialState: function() {
		return {
			user: this.props.user.data 
		};
	},

	render: function() {
		var {avatar, name, tags} = this.state.user;
		avatar = avatar || {};

		return (
			<View style={[styles.container, this.props.style]}>
				<Image style={styles.avatar} source={{ uri: avatar.thumb_url }}>
				</Image>
				<Text style={styles.userName}>{name}</Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: 8,
		flexDirection: 'row',
		padding: 10,
	},
	avatar: {
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 20,
		height: 40,
		width: 40
	},
	userName: {
		flex: 1,
		alignSelf: 'stretch',
		textAlign: 'left',
		color: theme.colors.DARK_GREY_FONT,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: 15,
		padding: 10,
	}
});

module.exports = UserCardSmallView;