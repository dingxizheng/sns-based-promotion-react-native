/*
* @Author: dingxizheng
* @Date:   2016-03-01 16:14:07
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 21:04:48
*/

'use strict';

var React = require('react-native');
var theme = require('../theme');
var Icon  = require('react-native-vector-icons/MaterialIcons');

var {
  	StyleSheet,
  	View,
  	Text,
  	TouchableOpacity
} = React;

var CustomTag = React.createClass({

	_onPress: function() {
		this.props.onPress && this.props.onPress();
	},

  	render: function() {
	    return (
	      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this._onPress}>
	      		<View style={styles.tagNameWrapper}>
	      		{ (()=>{
	      				if (this.props.icon)
	      					return <Icon style={[styles.tagName, {  fontSize: 17 }]} name={this.props.icon}></Icon>
	      				return <Text style={styles.tagName}>{ this.props.name }</Text>
	      		})()
	      		}
	      		</View>
	      		<View style={styles.tagItemWrapper}>
	      			<Text style={styles.tagItem}>{ this.props.text }</Text>
	      		</View>
	      </TouchableOpacity>
	    );
  	}
});


var styles = StyleSheet.create({
	container: {
		height: 30,
		borderWidth: 1,
		borderColor: theme.colors.MAIN,
		borderRadius: 6,
		flexDirection: 'row',
		overflow: 'hidden'
	},
	tagNameWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		width: 40,
		backgroundColor: theme.colors.MAIN,
		overflow: 'hidden'
	},
	tagName: {
		color: 'white',
	    fontSize: 14,
	    paddingLeft: 8, 
	    paddingRight: 5,
	    overflow: 'hidden'
	},
	tagItemWrapper: {
		flex: 1,
		height: 30,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	tagItem: {
		color: theme.colors.MAIN,
	    fontSize: 14,
	    paddingLeft: 5, 
	    paddingRight: 8,
	    
	}
});


module.exports = CustomTag;
