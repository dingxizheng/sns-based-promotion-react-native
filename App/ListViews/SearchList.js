/* 
* @Author: dingxizheng
* @Date:   2016-02-25 10:17:49
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 21:30:32
*/

'use strict';

var React             = require('react-native');
var RCTRefreshControl = require('react-refresh-control');
var BusyBox           = require('../Parts/BusyBox');
var theme             = require('../theme');
var Icon              = require('react-native-vector-icons/MaterialIcons');
var EmptyView         = require('../Parts/EmptyView');


var {
   StyleSheet,
   View,
   ListView,
   Text,
   TouchableOpacity
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var SearchList = React.createClass({

	getInitialState: function() {
		return {
			dataSource: ds.cloneWithRows([]),
			loadingNext: true,
			showHeader: false,
			title: this.props.title,
			haveMore: true,
			empty: false,
			loading: false,
		};
	},

	componentWillReceiveProps: function(nextProps) {
	  	this.setState({ 
	  		dataSource: ds.cloneWithRows(nextProps.dataList),
	  		loadingNext: nextProps.loadingNext,
	  		haveMore: nextProps.haveMore,
	  		empty: nextProps.dataList.length > 0 ? false : true,
	  		// loading: false,
	  	});
	},

	componentDidMount: function() {
		this._registerRefreshControl();
	},

	_registerRefreshControl: function() {
		RCTRefreshControl.configure({
	      node: this.refs["list"]
	    }, this._handleReload);
	},

	componentWillUnmount: function() {
		this._endRefreshing();
	},

	_onScroll: function({ nativeEvent }) {
		// console.log(nativeEvent);
	},

	_handleReload: function() {
		this.setState({
			loading: true
		});
		this.props.loadData && this.props.loadData(this._endRefreshing);
	},

	_endRefreshing: function() {
		this.state.loading &&
			RCTRefreshControl.endRefreshing(this.refs["list"]);
	},

	_onEndReached: function({ nativeEvent , timeStamp } = {}) {
		if(this.state.haveMore && nativeEvent && this.props.loadNext) {
			this.setState({ loadingNext: true });
			this.props.loadNext();
		}
	},

	_renderHeader: function() {
		if (!this.props.header)
			return

		var title = this.state.title || 'Resutls';
		return  <TouchableOpacity style={styles.header}>
					<Text style={styles.headerText}>{title}</Text>
					<Icon name="sort" style={styles.headerIcon}/>
				</TouchableOpacity>
	},

	_renderRow: function(rowData) {
		if (this.props.renderRow)
			return this.props.renderRow(rowData);
		else 
			return <View/>;
	},

	// _renderSeparator: function() {
	// 	return <View style={}></View>
	// },

	_renderFooter: function() {
		if (this.state.haveMore && this.state.loadingNext)
			return <BusyBox isVisible={true}/>

		if (this.state.empty)
			return <EmptyView style={{ marginTop: 100 }}loading={false} text="Pull down to refresh"/>
	},

	render: function() {
		// if (this.state.empty)
		// 	return <EmptyView loading={this.state.loading} text="Nothing found" buttonText="Try again" onPress={()=> this._handleReload()} />
		
	    return (
	      <View style={[styles.container, this.props.style]}>
	      		<ListView 
					ref="list"
					style={styles.content}
					onScroll={this._onScroll}
					onEndReached={this._onEndReached}
					onEndReachedThreshold={20}
					dataSource={this.state.dataSource}
					renderHeader={this._renderHeader}
					renderFooter={this._renderFooter}
					renderRow={this._renderRow}/>
	      </View>
	    );
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f3f3f3'
	},
	header: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingRight: 12,
		backgroundColor: '#f3f3f3'
	},
	headerText: {
		color: theme.colors.GREY_FONT,
	    fontSize: 11,
	    padding: 2
	},
	headerIcon: {
		color: theme.colors.GREY_FONT,
	    fontSize: 20,
	    padding: 2
	},
	content: {
		flex: 1
	}
});


module.exports = SearchList;
