/* 
* @Author: dingxizheng
* @Date:   2016-02-23 15:00:05
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 18:41:00
*/

/* @flow */
'use strict';

var React     = require('react-native');
var Tags      = require('./EditTagsView');
var {Tag}     = require('../apis');
var theme     = require('../theme');
var Utilities = require('../Utilities');
var Actions   = require('react-native-router-flux').Actions;

var {TableView, Section, Cell, CustomCell} = require('react-native-tableview-simple');

var {
  StyleSheet,
  View,
  Text
} = React;

var Address = React.createClass({

	getInitialState: function() {
	  this.props.submitCallback && this.props.submitCallback(this._onSubmit);
	  this.props.textChangeCallback && this.props.textChangeCallback(this._onInputText);

	  return {
	     results: []
	  };
	},

	_onSubmit: function(e) {
		this.props.onDone && this.props.onDone(e);
		return true;
	},

	_onInputText: async function(e) {
		try {
			var results = await Utilities.addressAutoComplete(e);
			var results = await results.json();

			this.setState({
				results: results.predictions
			});

		} catch(e) {
			console.log(e);
		}
	},

	_colorText: function(str, matched_substrings) {
		var results = [];
		var offset = 0;
		matched_substrings.forEach(function(sub, i) {
			if (sub.offset > offset) {
				results.push(str.substring(offset, sub.offset));
			}
			results.push(<Text key={i} style={{color: theme.colors.MAIN, fontWeight: '500' }}>{str.substring(sub.offset, sub.offset + sub.length)}</Text>);
			offset = sub.offset + sub.length;
		});
		results.push(str.substring(offset, str.length));
		return results;
	},

	render: function() {
		return (
		   <View style={styles.container}>
		   	  <Section header="suggests" sectionTintColor={"#eeeeee"}>
	            	{this.state.results.map((r, i)=>{
	            		return  <CustomCell key={i} onPress={()=> { Actions.pop(); this._onSubmit(r.description) } }>
			              			<Text numberOfLines={1} style={styles.cellLabel}>
			              			{this._colorText(r.description, r.matched_substrings)}
			              			</Text>
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


module.exports = Address;
