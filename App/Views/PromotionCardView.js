/* 
* @Author: dingxizheng
* @Date:   2016-02-01 14:14:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-02 17:50:33
*/

'use strict';
var React       = require('react-native');
var Actions     = require('react-native-router-flux').Actions;
var BlurView    = require('react-native-blur').BlurView;
var Icon        = require('react-native-vector-icons/MaterialIcons');
var theme       = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin = require('react-timer-mixin');
var RCTRefreshControl = require('react-refresh-control');
var Triangle = require('react-native-triangle');
var moment   = require('moment');
var ImageGroup  = require('./ImagesView');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var image = 'https://lh3.googleusercontent.com/-ZadaXoUTBfs/AAAAAAAAAAI/AAAAAAAAAAA/3rh5IMTHOzg/photo.jpg';
var image1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK0tZBJHXOlqL1qkw0pqqek8Vtgh0s7RGCfm4IxA3nwNx3WDboQ';
var image2 = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTvpcNgqJn5wwr6iy_m5IrOBdzRLfXDtDB1Lxr0wOLoT8we-pq5';
var image3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-';
var image4 = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Long_March_2D_launching_VRSS-1.jpg';

var images = [image1, image4, image3, image2];

var PromotionCard = React.createClass({
	render: function() {
		var {avatar, body, name, time} = this.props.promotion;

		return (
			<View style={styles.container}>
				<View style={styles.profileBox}>
					<Image
						source={{ uri: avatar }} 
						style={styles.avatar}/>
					
					<View style={styles.cardTitle}>
						<Text style={styles.profileName}>{name}
						<Text style={styles.contentTitle}> repromoted </Text> 
						xiaoding
						<Text style={styles.contentTitle}>{"'s"} post </Text>
						</Text>
						<Text style={styles.cardTime}>{moment(time).fromNow()}・within 1000 km</Text>
					</View>
				</View>
				<View style={styles.promotionContainer}>
					<View style={styles.promotionContentWrapper}>
						<View style={styles.promotionBody}>
						</View>
						
						<ImageGroup style={{marginLeft: 12, marginRight: 12}} columns={4} square={true} imageHeight={120} images={images}/>
						
						<StatusView style={{padding: 12}}>
							<StatusItem text="25" name="comments"/>
							<StatusItem text="19" name="repremotes"/>
							<StatusItem text="134" name="likes"/>
						</StatusView>

						<BottomActions style={{ height: 40 }}>
							<BottomItem icon="chat-bubble-outline" text="comment" type="icon-only"/>
							<BottomItem type="icon-only" icon="repeat" text="repromote"/>
							<BottomItem type="icon-only" icon="favorite-border" text="like"/>
							<BottomItem type="icon-only" icon="more-horiz" text="more"/>
						</BottomActions>
					</View>
				</View>
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
	},
	promotionContentWrapper: {
		// height: 500,
		// backgroundColor: '#eeeeee',
		// marginLeft: 12,
		// marginRight: 12,
	},
	promotionBody: {

	}
});

module.exports = PromotionCard;