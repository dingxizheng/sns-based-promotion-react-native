/* 
* @Author: dingxizheng
* @Date:   2016-02-16 16:19:13
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-29 14:28:37
*/

/* @flow */
'use strict';

var React        = require('react-native');
var theme        = require('../theme');
var Icon         = require('react-native-vector-icons/MaterialIcons');
var Actions      = require('react-native-router-flux').Actions;
var {Tag}        = require('../apis');
// var AutoComplete = require('../AutoComplete/AutoCompleteWrapper');

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AlertIOS
} = React;

var TagsView = React.createClass({

	getInitialState: function() {
	   return {
	     tags: [],
	   };
	},

	componentWillReceiveProps: function(nextProps) {
	  	var tags = nextProps.tags || [];
		this.tags = tags.slice(0);
		this.setState({tags: tags});
		this.props.tagsChange && this.props.tagsChange(this.tags);
	},

	componentDidMount: function() {
		var tags = this.props.tags || [];
		this.tags = tags.slice(0);
		this.setState({tags: tags});
		this.props.tagsChange && this.props.tagsChange(this.tags);
	},

	_handleOnPress: function(tag, i) {
		var tags = this.state.tags;
		tags.splice(i, 1);
		this.tags.splice(i, 1);
		this.setState({tags: tags});
		this.props.tagsChange && this.props.tagsChange(this.tags);
	},

	_renderTagItem: function(tag, i) {
		return <TouchableOpacity key={i} style={tagsStyles.tagItem} onPress={() => this._handleOnPress(tag, i)}>
					<Text style={[tagsStyles.tagItemText, this.props.tagStyle]}>
						{tag}
					</Text>
					<Icon name="close" style={[tagsStyles.closeTagIcon]}/>
			   </TouchableOpacity>;
	},

	_onAddTag: function(tag) {
		this.tags.push(tag);
		var tags = this.tags.slice(0);
		this.setState({tags: tags});
		this.props.tagsChange && this.props.tagsChange(this.tags);
		return false;
	},

	render: function() {
		if (this.state.tags.length > 0)
			return (
				<View style={[tagsStyles.container, this.props.style]}>
					{this.state.tags.map(function(tag, i){
						return this._renderTagItem(tag, i);
					}.bind(this))}
				</View>
			);
		else 
			return null;
	}
});

var tagsStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: 'white',
	},
	tagItem: {
		borderWidth: 1,
		height: 26,
		borderRadius: 13,
		borderColor:  '#aaa',

		flexDirection: 'row',

		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 4,
		marginBottom: 4,

		paddingLeft: 8,
		paddingRight: 8
	},
	tagItemText: {
		color: theme.colors.MAIN,
	    fontSize: 15,
	},
	closeTagIcon: {
		paddingLeft: 5,
		// alignSelf: 'stretch',
		fontSize: 16,
		color: 'red'
	},
});


module.exports = TagsView;
