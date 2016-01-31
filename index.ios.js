/* 
* @Author: dingxizheng
* @Date:   2016-01-23 13:24:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-29 16:27:23
*/

'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  Text,
  View,
  StatusBarIOS,
} = React;

var {
  Router,
  Route,
  Schema,
  Animations,
  TabBar,
  Actions
} = require('react-native-router-flux');

var RecorderView = require('./App/Views/RecorderView.ios');
var LoginView    = require('./App/Views/LoginView');
var ToastView    = require('./App/Views/ToastView');
var RightButtons = require('./App/Views/RightActionButtons');
var LeftButtons  = require('./App/Views/LeftActionButtons');
var PromotionView= require('./App/Views/PromotionView');
var GlobalEvent  = require('./App/GlobalEvent');

// set status bar style
StatusBarIOS.setStyle('light-content');

// custom toast view
var toastView    = <ToastView/>;

var counter = 0;

var App = React.createClass({

	getInitialState: function() {
		return { 
			isToastViewVisible: true 
		};
	},

	renderTitle: function(navigator, index, state) {
        let currentReoute = state.routeStack[index];
        let title = currentReoute.getTitle(navigator, index, state);
		return (
			<View style={styles.barTitleTextWrapper}>
				 <Text style={styles.barTitleText}>{title}</Text>
			</View>
		);
	},

	renderRightButton: function(navigator, index, state) {
		let currentReoute = state.routeStack[index];
        return <RightButtons routeName={currentReoute.name}/>
    },

    renderLeftButton: function(navigator, index, state) {
    	let currentReoute = state.routeStack[index];
    	return <LeftButtons routeName={currentReoute.name} 
    			navigator={navigator}
    			index={index}
    			state={state}/>;
    },

	render: function () {
		
		return <Router hideNavBar={false} 
					navigationBarStyle={{
						backgroundColor: '#1E90FF'
					}}
					barButtonTextStyle={{
						color: 'white'
					}}
					barButtonIconStyle={{
						tintColor: 'white'
					}}
					renderTitle={ this.renderTitle }
					renderLeftButton={ this.renderLeftButton }
					renderRightButton={ this.renderRightButton }>
					
					<Schema header={() => toastView} name="modal"  sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
	                
	                <Schema header={() => toastView} name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

	                <Route name="recorder" component={RecorderView} title="Record"/>
	                
	                <Route name="login" component={LoginView} title="Login"/>

	                <Route name="promotion" component={PromotionView} initial={true}  title="Promotion"/>
				</Router>

	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barTitleTextWrapper: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  barTitleText: {
  	fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    color: 'white'
    // marginTop: 11 + Layout.pixel,
  }
});

AppRegistry.registerComponent('VideoAdsReact', () => App);