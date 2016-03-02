/* 
* @Author: dingxizheng
* @Date:   2016-02-01 14:14:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 21:47:06
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
var Utiliites                   = require('../Utilities');
var CustomTag                   = require('../Parts/CustomTag');
var Icon                        = require('react-native-vector-icons/MaterialIcons');


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


var PromotionCard = React.createClass({

	getInitialState: function() {
		var {liked} = this.props.promotion.data;
		return {
		    liked: liked,
		    promotion: this.props.promotion.data
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

	_goToDetails: function(initialPage) {
		Actions.promotion({ promotion: new Promotion(this.props.promotion.data), initialPage: initialPage || 0 })
	},

	_writeRepost: function() {
		Actions.simpleInput({title: "Repost", placeholder: this.props.promotion.data.body, onDone: this._repostPromotion });
	},

	_writeComment: function() {
		Actions.simpleInput({title: "Comment", placeholder: this.props.promotion.data.body, onDone: this._commentPromotion });
	},

	_renderRoot: function() {
		if (this.props.promotion.data.root){
			var {body, photos, tags, created_at, price} = this.state.promotion.root;
			var {avatar, name} = this.props.promotion.data.root.user;
			avatar = avatar || {};
			
			return (
				<QuotedView style={{ marginTop: 5, marginLeft: 0, marginRight:0, paddingHorizontal: 10 }}>
					<TouchableOpacity onPress={()=> Actions.promotion({ title: body, promotion: new Promotion(this.props.promotion.data.root)})}>
					<View style={[styles.profileBox, { paddingLeft: 0}]}>
						<Image
							defaultSource={require('../../images/default_profile.jpg')}
							source={{ uri: avatar.thumb_url }} 
							style={styles.avatar}/>
					
						<View style={styles.cardTitle}>
							<Text style={styles.profileName}>{name}</Text>
							<Text style={styles.cardTime}>{moment(created_at).fromNow()}</Text>
						</View>
					</View>

					{this._renderPrice(price)}

					<HTMLView 
						style={styles.promotionText} 
						value={body} 
						stylesheet={{a:styles.a}}
						onLinkPress={url => console.log(url)}/>
					
					<ImageGroup columns={ photos.length == 1 ? 2 : 4 } square={true} imageHeight={120} images={photos}/>

					<TagsView style={{marginTop: 10, marginBottom: 10}}
						onPress={(tag) => Actions.tag({tag: tag})}
						onMore={() => console.log("more")}
						tags={tags}/>

				</TouchableOpacity>
				</QuotedView>
			);
		}
		else
			return null;
	},

	_renderPrice: function(price) {
		if (price < 0)
			return null;

		return  <View style={styles.infoTextWrapper}>
					<Text style={styles.infoText}><Icon name="attach-money"/>{parseFloat(price.toFixed(2))}</Text>
				</View>
	},

	render: function() {
		var {user, body, created_at, root, parent, distance, 
			photos, tags, likes, comments, reposts, price,
		} = this.state.promotion;
		var {avatar, name} = user;
		avatar = avatar || {};

		distance = 400;

		console.log(distance);

		return (
			<View overflow="hidden" style={[styles.container, this.props.style]}>
				<View style={styles.profileBox}>
					<Image
						defaultSource={require('../../images/default_profile.jpg')}
						source={{ uri: avatar.thumb_url }} 
						style={styles.avatar}/>
					
					<View style={styles.cardTitle}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.cardTime}>{moment(created_at).fromNow()}{ distance > 0 ? "・within " + distance.toFixed(0) + " km" : ''}</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.promotionContainer} onPress={()=> this._goToDetails(0) }>
					<View style={styles.promotionBody}>
						
						{this._renderPrice(price)}

						<HTMLView 
							style={styles.promotionText} 
							value={body} 
							stylesheet={{a:styles.a}}
							onLinkPress={url => console.log(url)}/>
						
						<ImageGroup columns={ photos.length == 1 ? 2 : 4 } square={true} imageHeight={120} images={photos}/>

						<TagsView style={{marginTop: 10, marginBottom: -2}}
							onPress={(tag) => Actions.tag({tag: tag })}
							onMore={() => console.log("more")}
							tags={tags}/>

						{this._renderRoot()}

					</View>					
				</TouchableOpacity>
				<BottomActions style={{ height: 35, marginTop: 10 }}>
						<BottomItem
						 	type={ comments.count < 1 ? "icon-only" : "nihao" }
							onPress={ comments.count < 1 ? this._writeComment : () => this._goToDetails(1) } 
							icon="chat-bubble-outline" 
							text={Utiliites.abbrNum(comments.count, 1) + ''}/>
						<BottomItem
							type={ reposts.count < 1 ? "icon-only" : "nihao" }
							onPress={this._writeRepost} 
							icon="repeat" 
							text={Utiliites.abbrNum(reposts.count, 1) + ''}/>
						<BottomItem onPress={this._likePromotion} 
							icon={this.state.liked ? "favorite" : "favorite-border"} 
							iconStyle={this.state.liked ? {color: '#C64A4A'} : null} 
							type={ likes.count < 1 ? "icon-only" : "nihao" }
							text={ Utiliites.abbrNum(likes.count, 1) + ''}/>
						<BottomItem icon="more-horiz" type="icon-only" text="more"/>
				</BottomActions>
			</View>
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
	infoTextWrapper: {
		marginBottom: 5,
		alignSelf: 'flex-end'
		// alignItems: 'center'
	},
	infoText: {
		textAlign: 'left',
		color: theme.colors.MAIN,
		fontSize: 22,
		fontWeight: theme.fonts.FONT_WEIGHT,
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
		marginLeft: 40
	},
	promotionBody: {
		marginLeft: 12,
		marginRight: 12,
	},
	promotionText: {
		paddingTop: 4,
		paddingBottom: 2,
		color: theme.colors.TEXT,
		fontWeight: theme.fonts.FONT_WEIGHT,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	a: {
		color: theme.colors.MAIN,
	}
});

module.exports = PromotionCard;