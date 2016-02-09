/* 
* @Author: dingxizheng
* @Date:   2016-02-08 14:12:41
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-08 16:31:25
*/

'use strict';

var React        = require('react-native');
var MapView      = require('react-native-maps');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var theme        = require('../theme');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var StreetView = React.createClass({

	mixins: [CustomButtonsMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	render: function() {
		return (
			<View style={styles.container}>
				<MapView
				  style={styles.map}
				  initialRegion={{
				    latitude: 37.484419,
				    longitude: -122.1499859,
				    latitudeDelta: 0.19,
				    longitudeDelta: 0.19,
				  }}/>	
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
		flex: 1
	}
});

module.exports = StreetView;