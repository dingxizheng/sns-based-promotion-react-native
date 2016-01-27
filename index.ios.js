/* 
* @Author: dingxizheng
* @Date:   2016-01-23 13:24:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-27 17:12:20
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
  TabBar
} = require('react-native-router-flux');

var RecorderView = require('./App/Views/RecorderView.ios');
var LoginView    = require('./App/Views/LoginView');
var ToastView    = require('./App/Views/ToastView');

// set status bar style
StatusBarIOS.setStyle('light-content');

// custom toast view
var toastView = <ToastView/>;

var App = React.createClass({

	getInitialState: function() {
		return { 
			isToastViewVisible: true 
		};
	},

	hideToastView: function() {
		this.setState({
			isToastViewVisible: false
		});
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
					renderTitle={ this.renderTitle }>
					
					<Schema header={() => toastView} name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
	                
	                <Schema header={ToastView} name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} navBar={"nihao"}/>

	                <Route name="recorder" component={RecorderView} initial={true} title="Record"/>
	                
	                <Route name="login" component={LoginView} title="Login"/>
				</Router>

	}
});

// { /* It doesn't matter where we put this component */ }
// <ToastView isVisible={this.state.isToastViewVisible || false} onDismiss={this.hideToastView}>
// 	<TouchableOpacity onPress={() => { console.log("DISMISSED"); }}>
//         <Text style={styles.toastText}>This message is easy to display and dismiss! Write as much as you want to, also! It will just flow down.</Text>
//     </TouchableOpacity>
// </ToastView>

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