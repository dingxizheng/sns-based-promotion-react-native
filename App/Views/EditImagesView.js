/* 
* @Author: dingxizheng
* @Date:   2016-02-18 17:30:00
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 17:41:02
*/

'use strict';

var React                = require('react-native');
var formStyles           = require('../formStyles');
var theme                = require('../theme');
var Lightbox             = require('react-native-lightbox');
var Icon                 = require('react-native-vector-icons/MaterialIcons');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} = React;

var Images = React.createClass({

	getInitialState: function() {
		return {
			parentLayouted: false,
			currentWidth: 0,
			images: this.props.images || []
		};
	},

	componentWillReceiveProps: function(nextProps) {
	  	this.setState({
	  		images: nextProps.images || []
	  	});
	},

	selectPhoto: function() {},

	removeImage: function(img, i) {
		this.state.images.splice(i, 1);
		this.setState({
		    images: this.state.images
		});
		this.props.imagesChange(this.state.images);
	},

	renderCarousel: function(imgItem) {
		return (
			<Image
				source={imgItem} 
				resizeMode="contain"
				style={{flex: 1}}/>
		);
	},

	componentDidMount: function() {
		this.props.imagesChange(this.state.images);
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
		var images = this.images;
		return images.map(function(img, i) {
			if (img !== 'add_photo') {
				return <Lightbox key={i} navigator={this.props.navigator} swipeToDismiss={true} renderContent={() => this.renderCarousel(img)}>
							<View key={i} style={this._getImageItemWrapperStyle(i)}>
								<View style={this._getImageItemStyle()}>
									 <Image
										source={img} 
										style={this._getImageItemStyle()}>
										<Icon onPress={() => this.removeImage(img, i)} name="close" style={styles.closeButton}/>
									</Image>
								</View>
						   </View>
						</Lightbox>
			} else {
				return <TouchableOpacity key={i} onPress={this.selectPhoto} style={[this._getImageItemWrapperStyle(i), { alignItems: 'center'}]}>
							<View style={[this._getImageItemStyle(), styles.iconWrapper]}>
								<Icon name="add-a-photo" style={styles.addPhotoButton}/>
							</View>
					   </TouchableOpacity>
			}
		}.bind(this));
	},

	render: function() {
		var images = this.state.images.slice(0);
		// images.push('add_photo');
		this.images = images;

		if (this.images.length < 1) 
			return null;

		return (
			<View style={[styles.imageGroup, this.props.style]} onLayout={this._onLayout}>
				{function(){
					if (this.state.parentLayouted) {
						return this.renderImages();
					}
				}.bind(this).call()}
			</View>
		);
	},

});

var styles = StyleSheet.create({
	imageGroup: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 0,
	},
	iconWrapper: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eeeeee'
	},
	closeButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: theme.colors.MAIN,
	    fontSize: 20,
	    backgroundColor: '#EEEEEEDD',
	    padding: 3
	},
	addPhotoButton: {
		color: theme.colors.DARK_GREY_FONT,
	    fontSize: 40,
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