/* 
* @Author: dingxizheng
* @Date:   2016-02-23 15:00:05
* @Last Modified by:   mover
* @Last Modified time: 2016-03-06 16:53:33
*/

/* @flow */
'use strict';

var React             = require('react-native');
var theme             = require('../theme');
var Utilities         = require('../Utilities');
var GroupButtons      = require('../Parts/GroupButtons');
var Actions           = require('react-native-router-flux').Actions;
var IconView          = require('../Parts/IconView');

var {User, Promotion} = require('../apis');
var {TableView, Section, Cell, CustomCell} = require('react-native-tableview-simple');

var {
  	StyleSheet,
  	View,
  	Text
} = React;

var Search = React.createClass({

	getInitialState: function() {
	  this.props.submitCallback 
	  	&& this.props.submitCallback(this._onSubmit);
	  this.props.textChangeCallback 
	 	&& this.props.textChangeCallback(this._onInputText);

	  return {
	     results: [],
	     type: 'promotions'
	  };
	},

	_onSubmit: function(e) {
		// this.props.onDone && this.props.onDone(e);
		// return true;
	},

	_onInputText: async function(e) {
		try {

			this.inputedText = e;
			var Source = this.state.type === 'promotions' ? Promotion : User;
			var results = await Source.fetchAll({ search: e }, { headers: { page: 1, per_page: 5 }});

			this.setState({ results: results });

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

	onButtonSelected: function(b, i) {
		this.setState({
			type: i === 0 ? 'promotions' : 'business',
			results: [],
		});
		this.inputedText && this._onInputText(this.inputedText);
	},

	render: function() {

		var selected= this.state.type === 'promotions' ? 0 : 1;

		if (this.state.results.length < 1)
			return (
			   <View style={styles.container}>
			   	  <GroupButtons selected={selected} buttons={["promotions", "business"]} style={{ margin: 10}} onPress={this.onButtonSelected}/>
			   </View>
			);


		return (
		   <View style={styles.container}>

		   	  <GroupButtons selected={selected} buttons={["promotions", "business"]} style={{ margin: 10}} onPress={this.onButtonSelected}/>

		   	  <Section header="are you looking for?" sectionTintColor={"#eeeeee"}>
	            	{this.state.results.map((r, i)=>{
	            		
	            		if (this.state.type === 'promotions')
		            		return  <CustomCell key={i} onPress={()=> { this._onSubmit(r.data.body) } }>
				              			<Text key={i} numberOfLines={3} style={styles.cellLabel}>
					              			<Text style={{color: theme.colors.MAIN, fontWeight: '500' }}>{r.data.user.name}: </Text>
					              			{r.data.body.replace(/\n|\r/g, " ")}
					              			<Text style={{color: theme.colors.MAIN, fontSize: 12}}>...more</Text>
				              			</Text>
				            		</CustomCell>

				        
				        if (this.state.type === 'business')
		            		return  <CustomCell key={i} onPress={()=> { this._onSubmit(r.data.body) } }>
		            					<IconView icon={true} leftIcon="person">
		            						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10}}>
		            							<Text style={{color: theme.colors.MAIN, fontSize: 12}}>{r.data.name.replace(/\n|\r/g, " ")}</Text>
		            						</View>
		            					</IconView>
				            		</CustomCell>

	            	})}
	          </Section>

		   </View>
		);
	}
});

// <Text key={i} numberOfLines={3} style={styles.cellLabel}>
					              		// 	{r.data.name.replace(/\n|\r/g, " ")}
					              		// 	<Text style={{color: theme.colors.MAIN, fontSize: 12}}></Text>
				              			// </Text>


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
	},
	// cellLabel: {
	// 	flex: 1,
	// 	flexDirection: 'row',
	// 	justifyContent: 'center',
	// 	ali
	// }
});


module.exports = Search;
