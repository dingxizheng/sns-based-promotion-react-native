/* 
* @Author: dingxizheng
* @Date:   2016-02-01 14:14:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 16:47:17
*/

'use strict';
var React                       = require('react-native');
var Actions                     = require('react-native-router-flux').Actions;
var theme                       = require('../theme');
var QuotedView                  = require('./QuotedView');
var moment                      = require('moment');
var HTMLView                    = require('react-native-htmlview');
var ImageGroup                  = require('./ImagesView');
var TagsView                    = require('./TagsView');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');
var {Promotion, Comment, Resource, Feeds} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var htmlContent = 'Suppose we had a custom tab bar called, we would inject it into our ScrollableTabView like this: <a href="good to go">http://google.com</a>'

// <Text style={styles.contentTitle}> repromoted </Text> 
// 						xiaoding
// 						<Text style={styles.contentTitle}>{"'s"} post </Text>
// 						</Text>

var PromotionCard = React.createClass({

	getInitialState: function() {
		var {liked} = this.props.promotion.data;
		return {
		    liked: liked,
		};
	},

	_likePromotion: async function() {
		try {
			var result = await this.props.promotion.like();
			this.setState({
				liked: (result.operation == 1 ? true : false)
			});
			Actions.toast({ msg: `You just ${ result.operation == 1 ? 'liked' : 'unliked'} this promotion!`, view_type: 'info', time: 1000});
		} catch(e) {
			console.log(e);
		}
	},

	_repostPromotion: async function(text) {
		try {
			
			var repost = new Promotion({
				body: text,
				parent_id: this.props.promotion.data.id
			});	
			var result = await repost.save();		
			Actions.toast({ msg: 'You just reposted this promotion!', view_type: 'info', time: 1000});
		} catch(e) {
			console.log(e);
		}
	},

	_commentPromotion: async function(text) {
		try {
			
			var comment = new Comment({
				body: text,
				promotion_id: this.props.promotion.data.id
			});	
			var result = await comment.save();		
			Actions.toast({ msg: 'You just commented this promotion!', view_type: 'info', time: 1000});
		} catch(e) {
			console.log(e);
		}
	},

	_writeRepost: function() {
		Actions.simpleInput({title: "Repost", placeholder: this.props.promotion.data.body, onDone: this._repostPromotion });
	},

	_writeComment: function() {
		Actions.simpleInput({title: "Comment", placeholder: this.props.promotion.data.body, onDone: this._commentPromotion });
	},

	_renderRoot: function() {
		if (this.props.promotion.data.root){
			var {body, photos, tags, created_at} = this.props.promotion.data.root;
			var {avatar, name} = this.props.promotion.data.root.user;
			
			return (
				<QuotedView style={{ marginTop: 5, marginLeft: 0, marginRight:0, paddingHorizontal: 10 }}>
					<TouchableOpacity onPress={()=> Actions.promotion({ title: body, promotion: new Promotion(this.props.promotion.data.root)})}>
					<View style={[styles.profileBox, { paddingLeft: 0}]}>
						<Image
							source={{ uri: avatar.thumb_url }} 
							style={styles.avatar}/>
					
						<View style={styles.cardTitle}>
							<Text style={styles.profileName}>{name}</Text>
							<Text style={styles.cardTime}>{moment(created_at).fromNow()}</Text>
						</View>
					</View>

					<HTMLView 
						style={styles.promotionText} 
						value={body} 
						stylesheet={{a:styles.a}}
						onLinkPress={url => console.log(url)}/>
					
					<ImageGroup columns={ photos.length == 1 ? 2 : 3 } square={true} imageHeight={120} images={photos}/>

					<TagsView style={{marginTop: 10, marginBottom: 10}}
						onPress={(tag, i) => console.log(tag, i)}
						onMore={() => console.log("more")}
						tags={tags}/>
				</TouchableOpacity>
				</QuotedView>
			);
		}
		else
			return null;
	},

	render: function() {
		var {user, body, created_at, root, parent, distance, photos, tags, likes, comments, reposts} = this.props.promotion.data;
		var {avatar, name} = user;

		distance = 400;

		return (
			<TouchableOpacity style={styles.container} onPress={()=> Actions.promotion({ title: body, promotion: new Promotion(this.props.promotion.data)})}>
				<View style={styles.profileBox}>
					<Image
						source={{ uri: avatar.thumb_url }} 
						style={styles.avatar}/>
					
					<View style={styles.cardTitle}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.cardTime}>{moment(created_at).fromNow()}{ distance > 0 ? "・within " + distance.toFixed(0) + " km" : ''}</Text>
					</View>
				</View>
				<View style={styles.promotionContainer}>
					<View style={styles.promotionBody}>
						
						<HTMLView 
							style={styles.promotionText} 
							value={body} 
							stylesheet={{a:styles.a}}
							onLinkPress={url => console.log(url)}/>
						
						<ImageGroup columns={ photos.length == 1 ? 2 : 3 } square={true} imageHeight={120} images={photos}/>

						<TagsView style={{marginTop: 10, marginBottom: -2}}
							onPress={(tag, i) => console.log(tag, i)}
							onMore={() => console.log("more")}
							tags={tags}/>

						{this._renderRoot()}

						<StatusView>
							<StatusItem text={comments.count + ''} onPress={()=> Actions.promotion({ initialPage: 1, title: body, promotion: new Promotion(this.props.promotion.data)})} name="comments"/>
							<StatusItem text={reposts.count + ''} name="reposts"/>
							<StatusItem text={likes.count + ''} name="likes"/>
						</StatusView>
					</View>
					<BottomActions style={{ height: 35 }}>
						<BottomItem onPress={this._writeComment} icon="chat-bubble-outline" text="comment" type="icon-only"/>
						<BottomItem onPress={this._writeRepost} type="icon-only" icon="repeat" text="repromote"/>
						<BottomItem onPress={this._likePromotion} 
							type="icon-only" 
							icon={this.state.liked ? "favorite" : "favorite-border"} 
							iconStyle={this.state.liked ? {color: '#C64A4A'} : null} 
							text="like"/>
						<BottomItem type="icon-only" icon="more-horiz" text="more"/>
					</BottomActions>
					
				</View>
			</TouchableOpacity>
		);
	},

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		marginTop: 8,
	},
	profileBox: {
		// height: 20,
		padding: 12,
		paddingTop: 12,
		paddingBottom: 4,
		flexDirection: 'row'
	},
	avatar: {
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 17,
		height: 34,
		width: 34
	},
	cardTitle: {
		paddingLeft: 10,
		// height: 34,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	contentTitle: {
		color: theme.colors.DARK_GREY_FONT,
		fontWeight: theme.fonts.FONT_WEIGHT
	},
	profileName: {
		flex: 1,
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: theme.fonts.FONT_SIZE_SMALL,
		alignSelf: 'stretch',
		textAlign: 'left',
	},
	cardTime: {
		textAlign: 'left',
		color: theme.colors.GREY_FONT,
		fontSize: theme.fonts.FONT_SIZE_EXTRA_SMALL,
		fontWeight: theme.fonts.FONT_WEIGHT,
		alignSelf: 'stretch'
	},
	promotionContainer: {
		flexDirection: 'column',
		// marginLeft: 30
	},
	promotionBody: {
		marginLeft: 12,
		marginRight: 12,
	},
	promotionText: {
		paddingTop: 4,
		paddingBottom: 2,
		color: theme.colors.DARK_GREY_FONT,
		fontWeight: theme.fonts.FONT_WEIGHT,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	a: {
		color: theme.colors.MAIN,
	}
});

module.exports = PromotionCard;