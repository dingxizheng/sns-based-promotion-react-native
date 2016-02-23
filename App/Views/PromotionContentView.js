/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 19:18:58
*/

'use strict';


var React = require('react-native');
var formStyles = require('../formStyles');
var theme = require('../theme');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Actions = require('react-native-router-flux').Actions;
var ImageGroup = require('./ImagesView');
var TagsView = require('./TagsView');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem} = require('./StatusView');
var LocationImage = require('./LocationImage');
var QuotedView = require('./QuotedView');
var moment   = require('moment');
var HTMLView = require('react-native-htmlview');

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

	componentWillMount: function() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	},

	_renderRoot: function() {
		if (this.props.promotion.data.root){
			var {body, photos, tags, created_at} = this.props.promotion.data.root;
			var {avatar, name} = this.props.promotion.data.root.user;
			
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

	render: function() {
		var {user, body, created_at, root, parent, distance, photos, tags, likes, comments, reposts} = this.props.promotion.data;
		var {avatar, name} = user;

		return (
			<ScrollView style={styles.container}>
				<View style={styles.profileBox}>
					<Image
						source={{ uri: avatar.thumb_url }} 
						style={styles.avatar}/>
					
					<View style={styles.profileInfo}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.profileTime}>{moment(created_at).fromNow()}{ distance > 0 ? "・within " + distance.toFixed(0) + " km" : ''}</Text>
					</View>
				</View>
				<View style={styles.promotionContent}>
					
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
						columns={1}
						square={false}
						imageHeight={150}
						images={photos}/>
					
					<LocationImage style={{marginTop: 10}} 
						address="472 Ruper St, Thunder Bay, Ontario"
						coordinates={[48.425893, -89.243557]}/>
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
		flexDirection: 'row'
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
		paddingTop: 0,
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