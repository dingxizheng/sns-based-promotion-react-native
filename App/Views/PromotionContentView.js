/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-12 21:00:44
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
	ScrollView
} = React;

var image  = 'https://lh3.googleusercontent.com/-ZadaXoUTBfs/AAAAAAAAAAI/AAAAAAAAAAA/3rh5IMTHOzg/photo.jpg';
var image1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK0tZBJHXOlqL1qkw0pqqek8Vtgh0s7RGCfm4IxA3nwNx3WDboQ';
var image2 = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTvpcNgqJn5wwr6iy_m5IrOBdzRLfXDtDB1Lxr0wOLoT8we-pq5';
var image3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-';
var image4 = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Long_March_2D_launching_VRSS-1.jpg';

var images = [image1, image4, image3, image2];

var PromotionView = React.createClass({

	render: function() {
		return (
			<ScrollView style={styles.container}>
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
					<HTMLView 
							style={styles.promotionText} 
							value={"Hi, here is the text and i am going to beat you!!!"} 
							stylesheet={{a:styles.a}}
							onLinkPress={url => console.log(url)}/>
		
					<ImageGroup 
						style={{marginTop: 5}}
						columns={2}
						square={false}
						imageHeight={120}
						images={images}/>

					<TagsView style={{paddingTop: 10 }}
						onPress={(tag, i) => console.log(tag, i)}
						onMore={() => console.log("more")}
						tags={['good', 'oliver', 'dingxizheng', 'promotionContainer', 'ImageGroup', 'StatusView']}/>
					
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
	a: {
		color: theme.colors.MAIN,
	}
});

module.exports = PromotionView;