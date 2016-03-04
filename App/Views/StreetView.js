/* 
* @Author: dingxizheng
* @Date:   2016-02-08 14:12:41
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 15:48:28
*/

'use strict';

var React              = require('react-native');
var MapView            = require('react-native-maps');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var theme              = require('../theme');
var Triangle           = require('react-native-triangle');
var PromotionCard      = require('../Parts/PromotionCardSmall');
var Icon               = require('react-native-vector-icons/MaterialIcons');

var {Promotion, Resource, Feeds} = require('../apis');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	InteractionManager,
	LayoutAnimation,
	Image
} = React;

var StreetView = React.createClass({

	mixins: [CustomButtonsMixin],

	getInitialState: function() {
		return {
			region: {
				latitude: this.props.coordinates[1] || 43.6267168,
				longitude: this.props.coordinates[0] || -79.5658697,
				latitudeDelta: 0.0922 * 5,
				longitudeDelta: 0.0421 * 5
			},
			dataList: [],
			currentDetail: null
		};
	},

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	componentDidMount: function() {
		console.log(LayoutAnimation.Presets.easeInEaseOut);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		InteractionManager.runAfterInteractions(()=>{
			this._loadData();
		});  
    },

    _loadData: function() {
    	Promotion.fetchAll({ lat: 43.6267168, long: -79.5658697, parent_id: 'null' }, { headers: { page: 1, per_page: 50}})
            .then((list) => {
               LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
               this.setState({
               		dataList: list
               });
            })
            .catch((e) => {
            });
    },

    _onRegionChange: function(e) {
    	Promotion.fetchAll({ lat: e.latitude, long: e.longitude, distance: 300, parent_id: 'null'}, { headers: { page: 1, per_page: 50}})
            .then((list) => {
               LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);	
               this.setState({
               		dataList: list
               });
            })
            .catch((e) => {
            });
    },

    _renderDeails: function() {
    	if (!this.state.dataList[0])
    		return 

    	return (
    		<View style={styles.detailsWrapper}>

	    		<View style={styles.details}>
	    			<PromotionCard  promotion={this.state.currentDetail || this.state.dataList[0]}/>
	    		</View>

	    		<TouchableOpacity style={{ position: 'absolute', top: 60, left: -10, height: 40, width:40, borderRadius: 20, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
	    			<Icon name="keyboard-arrow-left" size={20}/>
	    		</TouchableOpacity>

	    		<TouchableOpacity style={{ position: 'absolute', top: 60, right: -10, height: 40, width:40, borderRadius: 20, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
	    			<Icon name="keyboard-arrow-right" size={20}/>
	    		</TouchableOpacity>
    		</View>
    	);
    },

    _onMarkerCalled: function(p) {
    	LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    	this.setState({
    		currentDetail: p
    	});
    },

	render: function() {
		var initialRegion = this.state.region;
		var dataList = this.state.dataList;
		

		return (
			<View style={styles.container}>
				<MapView
				  onRegionChangeComplete={this._onRegionChange}
				  style={styles.map}
				  zoomEnabled={true} 
				  scrollEnabled={true} 
				  showsScale={true}
				  initialRegion={initialRegion}>

				  {dataList.map((point, i)=>{
				  		var latitude = point.data.coordinates[1];
				  		var longitude = point.data.coordinates[0];

				  		var avatar = point.data.user.avatar;
				  		avatar = avatar || {};

				  		return (
				  			<MapView.Marker
				  					key={i}
								  	coordinate={{latitude, longitude}}>
								  	<TouchableOpacity style={styles.marker} onPress={() => this._onMarkerCalled(point)}>
								  		<Image
								  		  source={{ uri: avatar.thumb_url }}
								  		  style={styles.markerImage}/>
								  		<View style={styles.triangleWrapper}>
									  		<Triangle
											  width={10}
											  height={8}
											  color={'#BBBBBB'}
											  direction={'down'}/>
									  	</View>
								  	</TouchableOpacity>
							</MapView.Marker>
						);

				  })}
				  

				</MapView>
				{this._renderDeails()}
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
	},
	marker: {
		width: 40,
		flexDirection: 'column',
		alignSelf: 'flex-start',
		// justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 4
	},
	markerImage: {
		backgroundColor: 'white',
		borderColor: '#bbb',
		borderWidth: 3,
		borderRadius: 20,
		height: 40,
		width: 40,
		overflow: 'hidden'
	},
	triangleWrapper: {
		width: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	detailsWrapper: {
		position: 'absolute',
		bottom: 10,
		left: 10,
		right: 10,
		height: 160,
		padding: 10,
		paddingTop: 0,
	},
	details: {
		flex: 1,
		overflow: 'hidden',
	}
});

module.exports = StreetView;