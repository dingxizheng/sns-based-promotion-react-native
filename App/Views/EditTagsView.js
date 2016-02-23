/* 
* @Author: dingxizheng
* @Date:   2016-02-16 16:19:13
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 22:19:13
*/

/* @flow */
'use strict';

var React        = require('react-native');
var theme        = require('../theme');
var Icon         = require('react-native-vector-icons/MaterialIcons');
var Actions      = require('react-native-router-flux').Actions;
var {Tag}        = require('../apis');
var AutoComplete = require('../AutoComplete/AutoCompleteWrapper');

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

	componentDidMount: function() {
		var tags = this.props.tags || [];
		this.tags = tags.slice(0);
		tags.push('__add__');
		this.setState({
			tags: tags
		});

		this.props.tagsChange(this.tags);
	},

	_handleOnPress: function(tag, i) {
		var tags = this.state.tags;
		tags.splice(i, 1);
		this.tags.splice(i, 1);
		this.setState({
			tags: tags
		});
		this.props.tagsChange(this.tags);
	},

	_renderTagItem: function(tag, i) {
		return <TouchableOpacity key={i} style={tagsStyles.tagItem} onPress={() => this._handleOnPress(tag, i)}>
					<Text style={[tagsStyles.tagItemText, this.props.tagStyle]}>
						{'#' + tag}
						<Text style={[tagsStyles.closeTagIcon, this.props.tagStyle]}> X</Text>
					</Text>
			   </TouchableOpacity>;
	},

	_renderAddTagButton: function(tag, i) {

		return <View style={{marginRight: 4, marginBottom: 4}}> 
					<AutoComplete
						onDone={this._onAddTag}
						contentProps={{ onRowPress: this._onAddTag }}
						placeholder="put tag here..."
						contentView={require('../ListViews/TagListView')}>

					<View key={i} style={[tagsStyles.tagItem, {marginRight: 0, marginBottom: 0}]}>
						<Text style={[tagsStyles.tagItemText, this.props.tagStyle]}>
							{'  Add Tag  '}
						</Text>
				   </View>
				   </AutoComplete>
			   </View>;
	},

	_onAddTag: function(tag) {
		this.tags.push(tag);
		var tags = this.tags.slice(0);
		tags.push('__add__');
		this.setState({
			tags: tags
		});
		this.props.tagsChange(this.tags);
		return false;
	},

	render: function() {
		return (
			<View style={[tagsStyles.container, this.props.style]}>
				{this.state.tags.map(function(tag, i){
					if (tag === '__add__')
						return this._renderAddTagButton(tag, i);
					return this._renderTagItem(tag, i);
				}.bind(this))}
			</View>
		);
	}
});

var tagsStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tagItem: {
		// borderWidth: .5,
		// borderColor: theme.colors.MAIN,
		borderRadius: 2,
		backgroundColor: '#eeeeee',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 4,
		marginBottom: 4
	},
	tagItemText: {
		color: theme.colors.MAIN,
	    fontSize: 15,
	    padding: 2,
	    paddingLeft: 4,
	    paddingRight: 4
	},
	closeTagIcon: {
		// alignSelf: 'stretch',
		color: 'red'
	},
});


module.exports = TagsView;
