/* 
* @Author: dingxizheng
* @Date:   2016-02-09 18:16:12
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 03:01:56
*/
'use strict';

var React        = require('react-native');
var Icon         = require('react-native-vector-icons/MaterialIcons');
var Utiliites    = require('../Utilities');
var theme        = require('../theme');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} = React;

var LocationImage = React.createClass({
	render: function() {
		var {address, coordinates} = this.props;
		if (coordinates){
			var title = address || 'Location';
			var locationUrl = Utiliites.googleMapImage()
									   .center(coordinates.join(","))
									   .size(600, 400)
									   .zoom(15)
									   .markers('red', 'S', coordinates.join(","))
									   .get();
			return (
				<TouchableOpacity style={[styles.container, this.props.style]}>
					<View style={styles.titleWrapper}>
						<Text style={styles.title}>
							<Icon name="map" style={{height:12}}/> {title}
						</Text>
					</View>
					<Image
					  style={styles.map}
					  source={{uri: locationUrl}} />
					 
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	}
});

var styles = StyleSheet.create({
	container: {
		height: 180,
		flexDirection: 'column'
	},
	titleWrapper: {
		justifyContent: 'center'
	},
	title: {
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT,
		fontSize: 12,
		paddingTop: 5,
		paddingBottom: 5
	},
	map: {
		flex: 1
	}
});

module.exports = LocationImage;