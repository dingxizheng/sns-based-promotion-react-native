/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 17:47:55
*/

'use strict';


var React              = require('react-native');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var Actions            = require('react-native-router-flux').Actions;
var TabBarView         = require('./TabBarView');
var LazyTabView        = require('./LazyTabView');
var TimeLineView       = require('./TimeLineView');
var StreetView         = require('./StreetView');
var UserView           = require('./UserView');

var {User, Resource,}  = require('../apis');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var HomeView = React.createClass({
	
	mixins: [CustomButtonsMixin],

	getInitialState: function() {
	  return {
	  };
	},

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	_renderAccount: function() {

		return <UserView tabLabel="account-box"
						nestedViewIndex={2}
						eventDelegates={this._eventDelegates}
						nestedView={true}/>
	},

	_onTabChanged: function(e) {	
		e && this._beforeRefreshBar(e.i);

		if (e && this.nestedChildren && this.nestedChildren[e.i]) {
			this._refreshBar(e.i);
		}
	},

	_beforeRefreshBar: function(i) {
		if (i == 1) {
			this.setTitleView("Explore");
		}

		if (i == 2) {
			this.setTitleView("Me");
		}

		if (i == 3) {
			this.setTitleView("Settings");
		}
	},

	_renderTabBar: function() {
		return <TabBarView 
					tabBarPosition="top" 
					underLineHeight={0.1} 
					style={{ height: 50, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor:'#f5f5f5' }} 
					iconStyle={{ fontSize:28 }} 
					type="icon-only"/>
	},

	render: function() {
		var {promotion} = this.props;
		return (
			<View style={styles.container}>
				<LazyTabView
					delay={200}
					tabBarPosition="bottom"
					initialPage={this.props.initialPage || 0}
					style={styles.content}
					renderTabBar={this._renderTabBar} 
					onChangeTab={this._onTabChanged}>

					<TimeLineView 
						tabLabel="home" 
						nestedView={true}
						nestedViewIndex={0}
						eventDelegates={this._eventDelegates}/>

					<StreetView 
						tabLabel="explore" 
						nestedView={true}
						nestedViewIndex={1}
						coordinates={[]}
						eventDelegates={this._eventDelegates}/>
					
					{this._renderAccount()}

					<View tabLabel="settings" />
		    	</LazyTabView>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	content: {
		flex: 1,
		flexDirection: 'column'
	}
});

module.exports = HomeView;