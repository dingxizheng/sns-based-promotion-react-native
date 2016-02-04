/* 
* @Author: dingxizheng
* @Date:   2016-02-02 15:51:37
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-02 16:43:50
*/

'use strict';

var React      = require('react-native');
var formStyles = require('../formStyles');
var theme      = require('../theme');
var Swiper     = require('react-native-swiper');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var StatusView = React.createClass({

	render: function() {
		if(this.props.children) {
			return <View style={[styles.container, this.props.style]}>
					  {this.props.children}
				   </View>;
		} 

		return null;
	}

});

var StatusItem = React.createClass({
	render: function() {
		return <TouchableOpacity style={[styles.statusItem, this.props.style, {marginLeft: 0}]} onPress={this.props.onPress}>
					<Text style={[styles.statusItemText, this.props.textStyle, {paddingLeft: 0}]}>{this.props.text || 'text'}</Text>
					{function(){
						if(this.props.type == "icon") {
							return <Icon name={this.props.icon} style={[styles.statusItemIcon, this.props.iconStyle]} />;
						}
						else {
							return <Text style={[styles.statusItemName, this.props.textStyle]}>{this.props.name || 'name'}</Text>
						}
					}.bind(this)()}
			   </TouchableOpacity>;
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 10
	},
	statusItem: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		marginRight: 10
	},
	statusItemIcon: {
		color: theme.colors.DARK_GREY_FONT,
	    fontSize: 17,
	    padding: 2
	},
	statusItemName: {
		color: theme.colors.DARK_GREY_FONT,
	    fontSize: 10,
	    padding: 2
	},
	statusItemText: {
		color: theme.colors.DARK_GREY_FONT,
	    fontSize: 10,
	    padding: 2
	}
});

module.exports = {StatusView, StatusItem};