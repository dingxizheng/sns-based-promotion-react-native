/* 
* @Author: dingxizheng
* @Date:   2016-02-11 15:58:45
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-11 16:07:30
*/

'use strict';

var React       = require('react-native');
var theme       = require('../theme');
var Icon        = require('react-native-vector-icons/FontAwesome');
var TagsView    = require('./TagsView');
var CustomButtonsMixin = require('../CustomButtonsMixin');

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} = React;

var tags = ['good', 'oliver', 'dingxizheng', 'promotionContainer', 'ImageGroup', 'StatusView'];

var TagsFullView = React.createClass({
	render: function() {
		return (
			<ScrollView
			  style={style.container}>
			  <TagsView style={{padding: 12}}
			  	  onPress={(tag, i) => console.log(tag, i)}
				  onMore={() => console.log("more")}
				  tags={tags}/>
			</ScrollView>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64
	}
});

module.exports = TagsFullView;