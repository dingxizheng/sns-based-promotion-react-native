/* 
* @Author: dingxizheng
* @Date:   2016-02-18 15:34:48
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-18 16:29:58
*/

/* @flow */
'use strict';

var React = require('react-native');
var theme   = require('../theme');

var {
    StyleSheet,
    View,
    TouchableOpacity,
    ListView,
    Text
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var TagListView = React.createClass({

	getInitialState: function() {
		return {
		  dataSource: ds.cloneWithRows([]),
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if ( nextProps.text == "ni" )  {
			this.setState({
				dataSource: ds.cloneWithRows(["nihao", "tamen"])
			});
		}
	},

	onRowPress: function(rowData) {
		this.props.onRowPress(rowData);
	},

	renderRow: function(rowData) {
		return (
			<TouchableOpacity style={styles.row} onPress={() => this.onRowPress(rowData) }>
				<Text style={styles.rowText}>{rowData}</Text>
		   	</TouchableOpacity>
		);
	},

	render: function() {
		return (
			<ListView
			  ref="tags"
			  style={styles.container}
			  dataSource={this.state.dataSource}
			  renderRow={this.renderRow}/>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		justifyContent: 'center',
        alignItems: 'center',
	},
	rowText: {
		backgroundColor: '#fff',
        fontSize: 17,
        padding: 10,
        alignSelf: 'stretch',
        textAlign: 'left',
        borderWidth: .5,
        borderColor: '#eee',
        color: theme.colors.GREY_FONT,
    },
});


module.exports = TagListView;
