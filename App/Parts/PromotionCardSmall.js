/* 
* @Author: dingxizheng
* @Date:   2016-02-01 14:14:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 15:05:03
*/

'use strict';
var React                       = require('react-native');
var Actions                     = require('react-native-router-flux').Actions;
var theme                       = require('../theme');
var moment                      = require('moment');
var HTMLView                    = require('react-native-htmlview');
var Utiliites                   = require('../Utilities');
var CustomTag                   = require('./CustomTag');
var Icon                        = require('react-native-vector-icons/MaterialIcons');

var {Promotion, Comment, Resource, Feeds} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var PromotionCard = React.createClass({

	getInitialState: function() {
		var {liked} = this.props.promotion.data;
		return {
		    liked: liked,
		    promotion: this.props.promotion.data
		};
	},

	_goToDetails: function(initialPage) {
		Actions.promotion({ promotion: new Promotion(this.state.promotion), initialPage: initialPage || 0 })
	},

	componentWillReceiveProps: function(nextProps) {
	  	this.setState({
	  		promotion: nextProps.promotion.data
	  	});
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

		if (body.length > 100) {
			body = body.substring(0, 100) + ' ...more';
		}

		return (
			<TouchableOpacity overflow="hidden" style={[styles.container, this.props.style]} onPress={()=> this._goToDetails(0)}>
				<View style={styles.profileBox}>
					<Image
						defaultSource={require('../../images/default_profile.jpg')}
						source={{ uri: avatar.thumb_url }} 
						style={styles.avatar}/>
					
					<View style={styles.cardTitle}>
						<Text style={styles.profileName}>{name}</Text>
						<Text style={styles.cardTime}>{moment(created_at).fromNow()}</Text>
					</View>
				</View>

				<View style={styles.promotionContainer}>
					
					<View style={styles.promotionBody}>

						<Text style={styles.promotionText}>{body}</Text>

					</View>					
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
		marginLeft: 40,
		overflow: 'hidden',
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