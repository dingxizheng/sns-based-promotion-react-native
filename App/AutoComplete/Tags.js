/* 
* @Author: dingxizheng
* @Date:   2016-02-23 15:00:05
* @Last Modified by:   mover
* @Last Modified time: 2016-03-05 17:49:20
*/

/* @flow */
'use strict';

var React     = require('react-native');
var Tags      = require('./EditTagsView');
var {Tag}     = require('../apis');
var GroupButtons = require('../Parts/GroupButtons');

var {TableView, Section, Cell, CustomCell} = require('react-native-tableview-simple');

var {
  StyleSheet,
  View,
  Text
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
		this._addTag(e);
	},

	_onInputText: async function(e) {
		try {
			var tags = await Tag.fetchAll({ search: e}, { headers: { page: 1, per_page: 5 } });
			this.setState({
				tags: tags.map((t) => t.data.body)
			});
		} catch(e) {
			console.log(e);
		}
	},

	_addTag: function(e) {
		if (this.state.initialTags.indexOf(e) === -1) {
			this.state.initialTags.push(e);
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
		   <View style={styles.container}>
		   	   
		   	   <Tags tags={this.state.initialTags} style={{padding: 10}} tagsChange={this.props.onTagsChange}/>
		       
		       {/*<TableView style={styles.container}
		                   allowsToggle={true}
		                   allowsMultipleSelection={false}
		                   tableViewStyle={TableView.Consts.Style.Grouped}
		                   tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
		                   onPress={this._addTag}>

		            {this._renderTags()}

		        </TableView>*/}
		        <Section header="suggests" sectionTintColor={"#eeeeee"}>
	            	{this.state.tags.map((tag, i)=>{
	            		return  <CustomCell key={i} onPress={() => this._addTag(tag) }>
			              			<Text numberOfLines={1} style={styles.cellLabel}>#{tag}</Text>
			            		</CustomCell>

	            	})}
	          </Section>
		    </View>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eeeeee'
	},
	cellLabel: {
		flex: 1,
		fontSize: 13,
        color: '#999',
        alignSelf: 'stretch',
        textAlign: 'left'
	}
});


module.exports = AddTags;
