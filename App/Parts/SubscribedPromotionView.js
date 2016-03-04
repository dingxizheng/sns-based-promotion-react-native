/* 
* @Author: dingxizheng
* @Date:   2016-02-11 16:11:31
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 21:02:44
*/

'use strict';

var React         = require('react-native');
var Actions       = require('react-native-router-flux').Actions;
var theme         = require('../theme');
var moment        = require('moment');
var HTMLView      = require('react-native-htmlview');
var Utiliites     = require('../Utilities');
var TagsView      = require('../Views/TagsView');
var Icon          = require('react-native-vector-icons/MaterialIcons');

var PromotionCard = require('../Views/PromotionCardView');

var {Promotion, Comment, Resource, Feeds} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var SubscribableCard = React.createClass({

	getInitialState: function() {
		var data = this.props.subscribed;
		var promotion = new Promotion(data.result);
		var subscribable = data.subscribable;
		
		return {
		    subscribed: data,
		    promotion: promotion,
		    subscribable: subscribable
		};
	},

	render: function() {
		var { subscribable, promotion } = this.state;
		var tags = [];
		if(subscribable.minimum_price > -1) {
			tags.push("gt $" + subscribable.minimum_price);
		}

		if(subscribable.maximum_price < 1000000000) {
			tags.push("lt $" + subscribable.minimum_price);
		}
		tags = tags.concat(subscribable.tags);

		return (
			<View style={[styles.container, this.props.style]}>
				<TouchableOpacity style={styles.tags}>
					
					<TagsView
						tagStyle={{ color: 'black' }}
						style={{marginTop: 8, marginBottom: 4}}
						onPress={(tag) => Actions.tag({tag: tag})}
						onMore={() => console.log("more")}
						tags={tags}/>

				</TouchableOpacity>
				<PromotionCard style={{marginTop:0,}} promotion={this.state.promotion}/>
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
	tags: {
		borderColor: '#eee',
		borderWidth: 1,
		paddingHorizontal: 10,
	}
});

module.exports = SubscribableCard;