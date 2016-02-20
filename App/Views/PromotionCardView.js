/* 
* @Author: dingxizheng
* @Date:   2016-02-01 14:14:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-16 15:33:41
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

var htmlContent = 'Suppose we had a custom tab bar called, we would inject it into our ScrollableTabView like this: <a href="good to go">http://google.com</a>'

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
					<View style={styles.promotionBody}>
						<HTMLView 
							style={styles.promotionText} 
							value={htmlContent} 
							stylesheet={{a:styles.a}}
							onLinkPress={url => console.log(url)}/>
						
						<ImageGroup columns={4} square={true} imageHeight={120} images={images}/>

						<TagsView style={{paddingTop: 4 }}
							onPress={(tag, i) => console.log(tag, i)}
							onMore={() => console.log("more")}
							tags={['good', 'oliver', 'dingxizheng', 'promotionContainer', 'ImageGroup', 'StatusView']}/>

						<StatusView>
							<StatusItem text="25" name="comments"/>
							<StatusItem text="19" name="repremotes"/>
							<StatusItem text="134" name="likes"/>
						</StatusView>
					</View>
					{/*<QuotedView style={{ marginLeft: 12, marginRight:12, padding: 0 }}>
						<ImageGroup style={{marginLeft: 12, marginRight: 12}} columns={4} square={true} imageHeight={120} images={images}/>
					
						<StatusView style={{padding: 12}}>
							<StatusItem text="25" name="comments"/>
							<StatusItem text="19" name="repremotes"/>
							<StatusItem text="134" name="likes"/>
						</StatusView>
					</QuotedView>*/}

					<BottomActions style={{ height: 40 }}>
						<BottomItem icon="chat-bubble-outline" text="comment" type="icon-only"/>
						<BottomItem type="icon-only" icon="repeat" text="repromote"/>
						<BottomItem type="icon-only" icon="favorite-border" text="like"/>
						<BottomItem type="icon-only" icon="more-horiz" text="more"/>
					</BottomActions>
					
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