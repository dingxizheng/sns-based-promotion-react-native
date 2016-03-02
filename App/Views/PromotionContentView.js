/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 21:48:33
*/

'use strict';


var React                       = require('react-native');
var formStyles                  = require('../formStyles');
var theme                       = require('../theme');
var Icon                        = require('react-native-vector-icons/MaterialIcons');
var Actions                     = require('react-native-router-flux').Actions;
var ImageGroup                  = require('./ImagesView');
var TagsView                    = require('./TagsView');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');
var LocationImage               = require('./LocationImage');
var LocationView                = require('../Parts/LocationView');
var QuotedView                  = require('./QuotedView');
var moment                      = require('moment');
var HTMLView                    = require('react-native-htmlview');
var {User}                      = require('../apis');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	LayoutAnimation
} = React;

var PromotionView = React.createClass({

	getInitialState: function() {
		return {
			promotion: this.props.promotion.data 
		};
	},

	componentWillMount: function() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	},

	_goToUser: function() {
		var {user} = this.state.promotion;
		Actions.user({ user: new User(user)});
	},

	_renderRoot: function() {
		if (this.state.promotion.root){
			var {body, photos, tags, created_at} = this.state.promotion.root;
			var {avatar, name} = this.state.promotion.root.user;
			avatar = avatar || {};
			
			return (
				<QuotedView style={{ marginTop: 2, marginLeft: 0, marginRight:0, paddingHorizontal: 10 }}>
					<TouchableOpacity onPress={()=> Actions.promotion({ title: body, promotion: new Promotion(this.props.promotion.data.root)})}>
					
					<View style={[styles.profileBox, {paddingLeft: 0}]}>
						<Image
							source={{ uri: avatar.thumb_url }} 
							style={styles.avatar}/>
						
						<View style={styles.profileInfo}>
							<Text style={styles.profileName}>{name}</Text>
							<Text style={styles.profileTime}>{moment(created_at).fromNow()}</Text>
						</View>
					</View>

					{this._renderPrice(price)}

					<HTMLView 
						style={styles.promotionText} 
						value={body} 
						stylesheet={{a:styles.a}}
						onLinkPress={url => console.log(url)}/>

					<TagsView style={{marginTop: 4, marginBottom: 10}}
						onPress={(tag, i) => console.log(tag, i)}
						onMore={() => console.log("more")}
						tags={tags}/>
					
					<ImageGroup  style={{marginTop: 0, marginBottom: 10}}
									columns={ photos.length == 1 ? 1 : 2 } square={true} imageHeight={120} images={photos}/>

					<LocationImage style={{marginTop: 0, marginBottom: 10}}
						address="472 Ruper St, Thunder Bay, Ontario"
						coordinates={[48.425893, -89.243557]}/>

					</TouchableOpacity>
					
				</QuotedView>
			);
		}
		else
			return null;
	},

	_renderPrice: function(price) {
		if (!price || price < 0)
			return null;

		return  <View style={styles.infoTextWrapper}>
					<Text style={styles.infoText}><Icon name="attach-money"/>{parseFloat(price.toFixed(2))}</Text>
				</View>
	},

	render: function() {
		var {user, body, created_at, root, parent, distance, 
			photos, tags, likes, comments, reposts,
			address, coordinates, price,
		} = this.state.promotion;
		var {avatar, name} = user;
		avatar = avatar || {};

		return (
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.profileBox} onPress={this._goToUser}>
					<Image
						source={{ uri: avatar.thumb_url }} 
						style={styles.avatar}/>
					
					<View style={styles.profileInfo}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.profileTime}>{moment(created_at).fromNow()}{ distance > 0 ? "・within " + distance.toFixed(0) + " km" : ''}</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.promotionContent}>
					
					{this._renderPrice(price)}

					<HTMLView 
							style={styles.promotionText} 
							value={body} 
							stylesheet={{a:styles.a}}
							onLinkPress={url => console.log(url)}/>
					
					{this._renderRoot()}
					
					<TagsView style={{paddingTop: 10 }}
						onPress={(tag, i) => console.log(tag, i)}
						onMore={() => console.log("more")}
						tags={tags}/>

					<ImageGroup 
						style={{marginTop: 5}}
						columns={2}
						square={false}
						imageHeight={150}
						images={photos}/>

					{(()=>{
						if (!root) 
							return <LocationView style={{marginTop: 10}} 
										address={ address || "472 Ruper St, Thunder Bay, Ontario"}
										coordinates={coordinates || [48.425893, -89.243557]}/>
						else 
							return null;
					})()}
					
					
				</View>
			</ScrollView>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	profileBox: {
		// height: 20,
		padding: 12,
		paddingTop: 12,
		flexDirection: 'row',
		borderBottomColor: '#eee',
		borderBottomWidth: 1,
	},
	infoTextWrapper: {
		marginBottom: 8,
		alignSelf: 'flex-end'
		// justifyContent: 'flex-start',
	},
	infoText: {
		textAlign: 'left',
		color: theme.colors.MAIN,
		fontSize: 25,
		fontWeight: theme.fonts.FONT_WEIGHT,
	},
	avatar: {
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 20,
		height: 40,
		width: 40
	},
	profileName: {
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: theme.fonts.FONT_SIZE,
		// alignSelf: 'stretch',
		textAlign: 'left',
	},
	profileInfo: {
		paddingLeft: 10,
		// height: 34,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		// alignItems: 'center',	
	},
	profileTime: {
		textAlign: 'left',
		color: theme.colors.GREY_FONT,
		fontSize: theme.fonts.FONT_SIZE_EXTRA_SMALL,
		fontWeight: theme.fonts.FONT_WEIGHT,
		// alignSelf: 'stretch'
	},
	promotionContent: {
		padding: 12,
		paddingTop: 8,
		flexDirection: 'column'
	},
	promotionText: {
		paddingBottom: 6,
		color: theme.colors.TEXT,
		fontSize: theme.fonts.FONT_SIZE,
		fontWeight: theme.fonts.FONT_WEIGHT
	},
	a: {
		color: theme.colors.MAIN,
	}
});

module.exports = PromotionView;