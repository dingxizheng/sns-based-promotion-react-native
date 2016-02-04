/* 
* @Author: dingxizheng
* @Date:   2016-02-01 20:01:51
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-02 17:46:57
*/

'use strict';

var React      = require('react-native');
var formStyles = require('../formStyles');
var theme      = require('../theme');
var Swiper     = require('react-native-swiper');
var Lightbox   = require('react-native-lightbox');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var Images = React.createClass({

	getInitialState: function() {
		return {
			parentLayouted: false,
			currentWidth: 0,
		};
	},

	renderCarousel: function(imgItem) {
		var images = this.props.images || [];
		var index = images.indexOf(imgItem);
		return (
			<Swiper bounces={true} loop={false} autoplay={true} autoplayTimeout={5} index={index} style={{flex:1}} showsPagination={false} showsButtons={true}>	
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

	_onLayout: function(e) {
		if (e.nativeEvent.layout.width !== this.state.currentWidth) {
			this.setState({
				parentLayouted: true,
				currentWidth: e.nativeEvent.layout.width
			});
		}
	},

	_getImageItemStyle: function() {
		var columns = this.props.columns || 2;
		var width = this.state.currentWidth;
		if(columns === 1) {
			width =  this.state.currentWidth
		} 
		else if(columns >= 2) {
			width = (this.state.currentWidth - (columns - 1) * 4) / columns;
		}

		return {
			// alignSelf: 'stretch',
			height: this.props.square ? width : this.props.imageHeight || 80,
			width: width,
			// borderWidth: .5,
			borderColor: '#bbbbbb',
			borderRadius: 2,
		};
	},

	_getImageItemWrapperStyle: function(index) {
		var columns = this.props.columns || 2;
		if(columns === 1)
			return styles.imageItemWrapperSingle;
		else{
			console.log(index, columns, index % columns);
			if(index % columns === 0) {
				return styles.imageItemWrapperLeft;
			}
			else if(index % columns === columns - 1) {
				return styles.imageItemWrapperRight;
			} 
			else {
				return styles.imageItemWrapperMiddle;
			}
		}
	},

	renderImages: function() {
		var images = this.props.images || [];
		return images.map(function(img, i) {
			return <Lightbox key={i} navigator={this.props.navigator} swipeToDismiss={false} renderContent={() => this.renderCarousel(img)}>
						<View style={this._getImageItemWrapperStyle(i)}>
							<Image
								source={{ uri: img }} 
								style={this._getImageItemStyle()}/>
					   </View>
					</Lightbox>
		}.bind(this));
	},

	render: function() {
		return (
			<View style={[styles.imageGroup, this.props.style]} onLayout={this._onLayout}>
				{function(){
					if (this.state.parentLayouted) {
						return this.renderImages();
					}
				}.bind(this)()}
			</View>
		);
	},

});

var styles = StyleSheet.create({
	imageGroup: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding:0,
	},
	imageItemWrapperLeft: {
		paddingRight: 2,
		paddingTop: 4,
	},
	imageItemWrapperMiddle: {
		paddingLeft: 2,
		paddingRight: 2,
		paddingTop: 4,
	},
	imageItemWrapperRight: {
		paddingLeft: 2,
		paddingTop: 4,
	},	
	imageItemWrapperSingle: {
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 4,
	},
});

module.exports = Images;