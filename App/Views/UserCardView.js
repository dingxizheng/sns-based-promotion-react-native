/* 
* @Author: dingxizheng
* @Date:   2016-02-11 16:11:14
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-29 00:56:37
*/

'use strict';

var React      = require('react-native');
var Actions    = require('react-native-router-flux').Actions;
var theme      = require('../theme');
var moment     = require('moment');
var HTMLView   = require('react-native-htmlview');
var ImageGroup = require('./ImagesView');
var TagsView   = require('./TagsView');

var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var UserCardView = React.createClass({

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
				<Image style={styles.background} defaultSource={require('../../images/profile_bg.jpg')}>
					<Image style={styles.avatar} source={{ uri: avatar.thumb_url }}>
					</Image>
				</Image>
				
				<View style={styles.userContent}>
					<Text style={styles.userName}>{name}</Text>
					{/*<ImageGroup columns={4} square={true} imageHeight={120} images={images}/>*/}
					
					<TagsView style={{paddingTop: 4 }}
						onPress={(tag, i) => console.log(tag, i)}
						onMore={() => console.log("more")}
						tags={tags}/>

					<StatusView>
						<StatusItem text="25" name="followers"/>
						<StatusItem text="19" name="posts"/>
						<StatusItem text="134" name="likes"/>
					</StatusView>
				</View>
				
				<BottomActions style={{ height: 40 }}>
					<BottomItem text="comment" icon="add" type="icon-only"/>
					<BottomItem type="icon-only" icon="favorite-border" text="like"/>
					<BottomItem type="icon-only" icon="more-horiz" text="more"/>
				</BottomActions>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: 8,
	},
	background: {
		height: 80,
		resizeMode: 'cover',
		alignItems: 'center',
		justifyContent: 'center'
	},
	avatar: {
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 25,
		height: 50,
		width: 50
	},
	userContent: {
		padding: 12,
		paddingBottom: 0,
		paddingTop: 0,
		justifyContent: 'center'
	},
	userName: {
		alignSelf: 'stretch',
		textAlign: 'center',
		color: theme.colors.DARK_GREY_FONT,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: 20,
		padding: 10,
	}
});

module.exports = UserCardView;