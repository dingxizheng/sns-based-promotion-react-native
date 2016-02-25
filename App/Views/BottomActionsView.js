/* 
* @Author: dingxizheng
* @Date:   2016-02-02 13:19:21
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-25 01:49:33
*/

'use strict';

var React = require('react-native');
var formStyles = require('../formStyles');
var theme = require('../theme');
var Icon  = require('react-native-vector-icons/MaterialIcons');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} = React;

var BottomActions = React.createClass({

	_renderTextOnly: function(props, key) {
		return <TouchableOpacity key={key} style={this._itemWrapperStyle('column')} onPress={props.onPress}>
					<Text style={[styles.itemText, props.textStyle]}>{props.text || 'button'}</Text>
			   </TouchableOpacity>;
	},

	_renderIconOnly: function(props, key) {
		return <TouchableOpacity key={key} style={this._itemWrapperStyle('column')} onPress={props.onPress}>
					<Icon name={props.icon} style={[styles.itemIcon, props.iconStyle]} />
			   </TouchableOpacity>;
	},

	_renderVertically: function(props, key) {
		return <TouchableOpacity key={key} style={this._itemWrapperStyle('column')} onPress={props.onPress}>
					<Icon name={props.icon} style={[styles.itemIcon, props.iconStyle]} />
					<Text style={[styles.itemText, props.textStyle]}>{props.text || 'button'}</Text>
			   </TouchableOpacity>;
	},

	_renderHorizontally: function(props, key) {
		return <TouchableOpacity key={key} style={this._itemWrapperStyle('row')} onPress={props.onPress}>
					<Icon name={props.icon} style={[styles.itemIcon, props.iconStyle]} />
					<Text style={[styles.itemText, props.textStyle]}>{props.text || 'button'}</Text>
			   </TouchableOpacity>;
	},

	_renderSeparator: function(props, i) {
		var height = this.props.separatorHeight;
		return <View key={i} style={[styles.separator, {height}]}></View>
	},

	_itemWrapperStyle: function(direction) {
		return {
			flex: 1 / (this.props.children.length || 1),
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: direction
		};
	},

	render: function() {
		var items = this.props.children;
		if (!Array.isArray(this.props.children)) {
			items = [this.props.children];
		}
		var itemsToAdd = [];
		
		items.forEach(function(item, i) {
			itemsToAdd.push(item);
			if (i !== items.length - 1)
				itemsToAdd.push({
					props: { type: 'separator' }
				});
		});

		return (
			<View style={[styles.footer, this.props.style]}>
				{itemsToAdd.map(function(item, i){
					if(item.props.type == "text-only")
						return this._renderTextOnly(item.props, i);
					else if(item.props.type == "icon-only")
						return this._renderIconOnly(item.props, i);
					else if(item.props.type == "vertical")
						return this._renderVertically(item.props, i);
					else if(item.props.type == "separator")
						return this._renderSeparator(item.props, i);
					else
						return this._renderHorizontally(item.props, i);
				}.bind(this))}
			</View>
		);
	},

});


var BottomItem = React.createClass({
	render: function() {
		return null;
	},
});

var styles = StyleSheet.create({
	footer: {
		// flex: 1,
		height: 45,
		flexDirection: 'row',
		borderTopColor: '#eeeeee',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1
	},
	itemIcon: {
		color: theme.colors.GREY_FONT,
	    fontSize: 17,
	    padding: 2
	},
	itemText: {
		color: theme.colors.GREY_FONT,
	    fontSize: 10,
	    padding: 2
	},
	separator: {
		height: 0,
		width: 1,
		backgroundColor: '#ddd'
	}
});

module.exports = {BottomActions, BottomItem};
