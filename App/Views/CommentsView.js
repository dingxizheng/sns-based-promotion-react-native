/* 
* @Author: dingxizheng
* @Date:   2016-01-31 18:55:51
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-23 20:53:47
*/

'use strict';

var React                        = require('react-native');
var Actions                      = require('react-native-router-flux').Actions;
var Icon                         = require('react-native-vector-icons/MaterialIcons');
var theme                        = require('../theme');
var CommentView                  = require('./CommentView');
// var CustomButtonsMixin        = require('../CustomButtonsMixin');
// var TimerMixin                = require('react-timer-mixin');
var RCTRefreshControl            = require('react-refresh-control');
var BusyBox                      = require('./BusyBox');
var {Promotion, Resource, Comment} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	ListView,
	LayoutAnimation
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var Comments = React.createClass({

	getInitialState: function() {
		return {
		  loadingNext: false,
		  dataSource: ds.cloneWithRows(["busyBox"]),
		};
	},

	componentWillMount: function() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	},

	componentDidMount: function() {
	    RCTRefreshControl.configure({
	      node: this.refs["comments"]
	    }, this._handleReload);

	    // fetch feeds
	    this._fetchComments();
	},

	_fetchComments: async function() {
		this.setState({loadingNext: true});
		try {
			var comments = await Comment.fetchAll({promotion_id: this.props.promotion.data.id});
			this.setState({ dataSource: ds.cloneWithRows(comments)});
		} catch (e) {
			console.log(e);
		}
		this.setState({loadingNext: false});
	},

	_handleReload: function() {
      this.setTimeout(() => {
        RCTRefreshControl.endRefreshing(this.refs["comments"]);
      }, 2000);
	},

	renderRow: function(rowData) {
		if (rowData === 'busyBox')
			return <BusyBox isVisible={this.state.loadingNext} text="loading..."/>
		
		return <CommentView comment={rowData}/>
	},

	render: function() {
		return (
			<ListView
			  ref="comments"
			  style={styles.container}
			  dataSource={this.state.dataSource}
			  renderRow={this.renderRow}/>
		);
	}

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: 64,
		flexDirection: 'column',
	},
});


module.exports = Comments;
