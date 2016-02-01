/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-01 01:57:25
*/

'use strict';


var React = require('react-native');
var formStyles = require('../formStyles');
var theme = require('../theme');
var accountApis = require('../apiCalls').accounts;
var CustomButtonsMixin = require('../CustomButtonsMixin');
var Swiper = require('react-native-swiper');
var Lightbox = require('react-native-lightbox');
var dimensions = require('Dimensions');
var Icon        = require('react-native-vector-icons/MaterialIcons');
var Actions   = require('react-native-router-flux').Actions;

// console.log(dimensions.get('window'));
var {width, height} = dimensions.get('window');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var image = 'https://lh3.googleusercontent.com/-ZadaXoUTBfs/AAAAAAAAAAI/AAAAAAAAAAA/3rh5IMTHOzg/photo.jpg';
var image1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK0tZBJHXOlqL1qkw0pqqek8Vtgh0s7RGCfm4IxA3nwNx3WDboQ';
var image2 = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTvpcNgqJn5wwr6iy_m5IrOBdzRLfXDtDB1Lxr0wOLoT8we-pq5';
var image3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-';
var image4 = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Long_March_2D_launching_VRSS-1.jpg';

var images = [image1, image4, image3, image2];

var PromotionView = React.createClass({
	
	mixins: [CustomButtonsMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	renderCarousel: function(img) {
		return (
			<Swiper style={{flex:1}} showsPagination={false} showsButtons={true}>	
					{images.map(function(image, i){
						return <Image
								key={i}
								source={{ uri: image }} 
								resizeMode="contain"
								style={{flex: 1}}/>
					}.bind(this))}
		    </Swiper>
		);
	},

	_onImageOpen: function(image) {
		this.currentImage = image;
	},

	makeComment: function(text) {
		console.log(text);
		return true;
	},

	commentThis: function() {
		Actions.comment({
			title: 'New Comment',
			onDone: this.makeComment
		});
	},

	render: function() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.content}>
					<View style={styles.profileBox}>
						<Image
							source={{ uri: image }} 
							style={styles.avatar}/>
						
						<View style={styles.profileInfo}>
							<Text style={styles.profileName}>dingxizheng</Text>
							<Text style={styles.profileTime}>1d</Text>
						</View>
					</View>
					<View style={styles.promotionContent}>
						<Text style={styles.promotionText}>
							Hi, here is the text and i am going to beat you!!!
						</Text>
						<View style={styles.promotionImages}>
							{images.map(function(img, i){

								return <Lightbox key={i} navigator={this.props.navigator} swipeToDismiss={false} onOpen={()=> this._onImageOpen(img) } renderContent={() => this.renderCarousel(img)}>
											<View style={ i % 2 === 0 ? styles.promotionImageItemWrapperLeft : styles.promotionImageItemWrapperRight}>
												<Image
													source={{ uri: img }} 
													style={styles.promotionImageItem}/>
										   </View>
										</Lightbox>

							}.bind(this))}
						</View>
					</View>

				</ScrollView>
				<View style={styles.footer}>
					<TouchableOpacity style={styles.footerMenuItemWrapper} onPress={this.commentThis}>
						<Icon name="chat-bubble-outline" style={styles.footerMenuItemIcon} />
						<Text style={styles.footerMenuItemText}>comment</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.footerMenuItemWrapper}>
						<Icon name="repeat" style={styles.footerMenuItemIcon} />
						<Text style={styles.footerMenuItemText}>repromote</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.footerMenuItemWrapper}>
						<Icon name="favorite-border" style={styles.footerMenuItemIcon}/>
						<Text style={styles.footerMenuItemText}>like</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		flexDirection: 'column',
	},
	content: {
		flex: 1,
		flexDirection: 'column'
	},
	footer: {
		height: 45,
		flexDirection: 'row',
		borderTopColor: '#eeeeee',
		borderTopWidth: .5
	},
	footerMenuItemWrapper: {
		flex: .333,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	footerMenuItemIcon: {
		color: theme.colors.GREY_FONT,
	    fontSize: 22,
	    padding: 3
	},
	footerMenuItemText: {
		color: theme.colors.GREY_FONT,
	    fontSize: 13,
	    padding: 3
	},
	profileBox: {
		// height: 20,
		padding: 12,
		paddingTop: 20,
		flexDirection: 'row'
	},
	avatar: {
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 20,
		height: 40,
		width: 40
	},
	profileInfo: {
		paddingLeft: 10,
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	profileName: {
		flex: 0.7,
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	profileTime: {
		textAlign: 'right',
		flex: 0.3,
		color: theme.colors.GREY_FONT,
		fontSize: theme.fonts.FONT_SIZE_SMALL
	},
	promotionContent: {
		padding: 12,
		paddingTop: 0,
		flexDirection: 'column'
	},
	promotionText: {
		color: theme.colors.TEXT,
		fontSize: theme.fonts.FONT_SIZE,
		fontWeight: theme.fonts.FONT_WEIGHT
	},
	promotionImages: {
		marginTop: 15, 
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	promotionImageItemWrapperLeft: {
		// flex: 0.5,
		paddingRight: 2,
		paddingTop: 4,
	},
	promotionImageItemWrapperRight: {
		// flex: 0.5,
		paddingLeft: 2,
		paddingTop: 4,
	},
	promotionImageItem: {
		// alignSelf: 'stretch',
		height: 120,
		width: (width - 28) / 2,
		borderWidth: .5,
		borderColor: '#bbbbbb',
		borderRadius: 2,
		// width: 50
	}
});

module.exports = PromotionView;