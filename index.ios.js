/* 
* @Author: dingxizheng
* @Date:   2016-01-23 13:24:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-23 21:06:55
*/

'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
} = React;

var {
  Router,
  Route,
  Schema,
  Animations,
  TabBar
} = require('react-native-router-flux');

var RecorderView = require('./App/Views/RecorderView.ios');
var LoginView    = require('./App/Views/LoginView');


var App = React.createClass({
	render: function () {
		
		return (
			<Router hideNavBar={false}>
				<Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

                <Route name="recorder" component={RecorderView}  title="Record"/>
                <Route name="login" component={LoginView} initial={true} title="Login"/>
			</Router>
		);

	}
});

AppRegistry.registerComponent('VideoAdsReact', () => App);