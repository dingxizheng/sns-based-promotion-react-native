/* 
* @Author: dingxizheng
* @Date:   2016-01-31 18:56:08
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 21:40:30
*/

'use strict';

var React      = require('react-native');
var Actions    = require('react-native-router-flux').Actions;
var BlurView   = require('react-native-blur').BlurView;
var Icon       = require('react-native-vector-icons/MaterialIcons');
var QuotedView = require('./QuotedView');
var moment     = require('moment');
var theme      = require('../theme');

var {View, Text, StyleSheet, TouchableOpacity, Image} = React;
var {Comment, Resource} = require('../apis');

var CommentView = React.createClass({

	_replyComment: async function(text) {
		try {

			var comment = new Comment({
				body: text,
				promotion_id: this.props.comment.data.commentee_id,
				parent_id: this.props.comment.data.id
			});	
			console.log(comment);
			var result = await comment.save();		
			Actions.toast({ msg: 'Commented successfully!', view_type: 'info', time: 1000});
		
		} catch(e) {
			console.log(e);
		}
	},

	_writeReply: function() {
		Actions.simpleInput({title: "Reply", placeholder: this.props.comment.data.body, onDone: this._replyComment });
	},

	_renderParent: function() {

		if (this.props.comment.data.parent) {
			var {body, created_at, commenteer} = this.props.comment.data.parent;
			var {name, avatar, time} = commenteer;

			return (
				<QuotedView style={styles.parentComment}>
					<TouchableOpacity style={styles.profileInfo}>
					<Text style={[styles.profileName, { fontSize: 13}]}><Text style={{color: theme.colors.GREY_FONT}}>replied to </Text>{name}</Text>
					</TouchableOpacity>
					
					<View style={styles.commentContent}>
						<Text style={styles.commentContentText}>{body}</Text>
					</View>
				</QuotedView>
			);
		}
	},

	render: function() {
		var {body, created_at, commenteer} = this.props.comment.data;
		var {name, avatar, time} = commenteer;

		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.avatarWrapper}>
					<Image
						source={{ uri: avatar.thumb_url }} 
						style={styles.avatar}/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.contentWrapper}>
					<TouchableOpacity style={styles.profileInfo}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.profileTime}>{moment(created_at).fromNow()}</Text>
					</TouchableOpacity>
					
					<View style={styles.commentContent}>
						<Text style={styles.commentContentText}>{body.trim()}</Text>
					</View>

					{this._renderParent() }

					<View style={styles.commentActions}>
						<TouchableOpacity style={styles.actionItemWrapper} onPress={this._writeReply}>
							<Icon name="reply" style={styles.actionItemIcon} />
							<Text style={styles.actionItemText}>100</Text>
						</TouchableOpacity>
						
						<TouchableOpacity style={styles.actionItemWrapper} onPress={this._likeComment}>
							<Icon name="favorite-border" style={styles.actionItemIcon}/>
							<Text style={styles.actionItemText}>56</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
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
		borderBottomWidth: .5,
		backgroundColor: 'white'

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
		color: theme.colors.TEXT,
		fontWeight: theme.fonts.FONT_WEIGHT,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	profileInfo: {
		// paddingLeft: 10,
		// height: 30,
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 5,
		justifyContent: 'flex-end'
		// alignItems: 'center'
	},
	profileName: {
		flex: 1,
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	profileTime: {
		textAlign: 'right',
		// flex: 0.3,
		color: theme.colors.GREY_FONT,
		fontSize: theme.fonts.FONT_SIZE_SMALL - 2
	},
	commentActions: {
		marginTop: 8,
		height: 17,
		flexDirection: 'row',
		justifyContent: 'flex-start'
		// borderTopColor: '#eeeeee',
		// borderTopWidth: .5
	},
	actionItemWrapper: {
		width: 80,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row'
	},
	actionItemIcon: {
		color: theme.colors.GREY_FONT,
	    fontSize: 14,
	    padding: 3,
	    paddingLeft: 0,
	},
	actionItemText: {
		color: theme.colors.GREY_FONT,
	    fontSize: 12,
	    padding: 3
	},
	parentComment: {
		marginTop: 4,
		padding: 6,
		paddingTop: 6,
		paddingBottom: 6,
	}
});

module.exports = CommentView;