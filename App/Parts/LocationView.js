/*
* @Author: dingxizheng
* @Date:   2016-02-29 17:32:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-29 19:04:26
*/

'use strict';

var MapView  = require('react-native-maps');
var React    = require('react-native');
var theme    = require('../theme');
var Triangle = require('react-native-triangle');

var {
	View,
	StyleSheet,
	Text
} = React

var LocationView = React.createClass({

	getInitialState: function() {

		return {
			region: {
				latitude: this.props.coordinates[1] || 0,
				longitude: this.props.coordinates[0] || 0,
				latitudeDelta: 0.0922 * 0.05,
				longitudeDelta: 0.0421 * 0.05
			}
		};
	},

	render: function() {
		var initialRegion = this.state.region;
		var {latitude, longitude} = this.state.region;

		return (
			<View style={[styles.container, this.props.style]}>
				<MapView initialRegion={initialRegion} style={{flex: 1}} zoomEnabled={true} scrollEnabled={false} showsScale={true}>
				  <MapView.Marker
				  	coordinate={{latitude, longitude}}>
				  	<View style={styles.marker}>
				  		<Text numberOfLines={1} style={styles.markerTitle}>{"React Native and myself"}</Text>
				  		<View style={styles.triangleWrapper}>
				  		<Triangle
						  width={10}
						  height={8}
						  color={'#BBBBBB'}
						  direction={'down'}/>
					  	</View>
				  	</View>
				  </MapView.Marker>
				</MapView>
			</View>
		);
	}

});

var styles = StyleSheet.create({
	container: {
		height: 150,
		flexDirection: 'column',
	},
	marker: {
		width: 150,
		flexDirection: 'column',
		alignSelf: 'flex-start',
		// justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 4
	},
	markerTitle: {
		backgroundColor: 'white',
		alignSelf: 'stretch',
		textAlign: 'center',
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT,
		fontSize: 12,
		padding: 6,
		borderColor: '#bbb',
		borderWidth: 1,
		overflow: 'hidden'
	},
	titleWrapper: {
		justifyContent: 'center'
	},
	triangleWrapper: {
		width: 150,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		// color: theme.colors.MAIN,
		// fontWeight: theme.fonts.FONT,
		fontSize: 12,
		paddingTop: 5,
		paddingBottom: 5,
		overflow: 'hidden'
	},
	map: {
		flex: 1
	}
});

module.exports = LocationView;