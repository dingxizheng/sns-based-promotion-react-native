/* 
* @Author: dingxizheng
* @Date:   2016-02-23 15:00:05
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-23 19:04:10
*/

/* @flow */
'use strict';

var React     = require('react-native');
var Tags      = require('../Views/EditTagsView');
var TableView = require('react-native-tableview');
var {Tag}     = require('../apis');
var Section   = TableView.Section;
var Item      = TableView.Item;

var {
  StyleSheet,
  View,
} = React;

var AddTags = React.createClass({

	getInitialState: function() {
	  this.props.submitCallback && this.props.submitCallback(this._onSubmit);
	  this.props.textChangeCallback && this.props.textChangeCallback(this._onInputText);

	  var initialTags = this.props.initialTags || [];

	  return {
	     tags: [],
	     initialTags: initialTags.slice(0)
	  };
	},

	componentWillReceiveProps: function(nextProps) {
		this._onInputText(nextProps.text || "tag");
	},

	_onSubmit: function(e) {
		this._addTag({ value: e });
	},

	_onInputText: async function(e) {
		try {
			var tags = await Tag.fetchAll({ search: e});
			this.setState({
				tags: tags.map((t) => t.data.body)
			});
		} catch(e) {
			console.log(e);
		}
	},

	_addTag: function(e) {
		if (this.state.initialTags.indexOf(e.value) === -1) {
			this.state.initialTags.push(e.value);
			this.setState({
				initialTags: this.state.initialTags
			});
		}
	},

	_renderTags: function() {
		if (this.state.tags.length > 0) {
			return (
				<Section label="Results">
	                {this.state.tags.map(function(tag, i) {
	                	return <Item key={i} value={tag}>{"#" + tag}</Item>
	                }.bind(this))}
			 	</Section>
			);
		}
	},

	render: function() {
		return (
		   <View style={{flex: 1,}}>
		   	   
		   	   <Tags tags={this.state.initialTags} style={{padding: 10}}/>
		       
		       <TableView style={styles.container}
		                   allowsToggle={true}
		                   allowsMultipleSelection={false}
		                   tableViewStyle={TableView.Consts.Style.Grouped}
		                   tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
		                   onPress={this._addTag}>

		            {this._renderTags()}

		        </TableView>
		    </View>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eeeeee'
	}
});


module.exports = AddTags;
