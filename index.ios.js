/* 
* @Author: dingxizheng
* @Date:   2016-01-23 13:24:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 23:01:38
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
  LayoutAnimation,
  Animated
} = React;

var {
  Router,
  Route,
  Schema,
  Animations,
  TabBar,
  Actions
} = require('react-native-router-flux');

require('./storage');
require('./App/httpmiddlewares');

var RecorderView  = require('./App/Views/RecorderView.ios');
var LoginView     = require('./App/Views/LoginView');
var SignUpView    = require('./App/Views/SignUpView');
var ToastView     = require('./App/Views/ToastView');
var RightButtons  = require('./App/NavBarParts/RightActionButtons');
var LeftButtons   = require('./App/NavBarParts/LeftActionButtons');
var BarTitleView  = require('./App/NavBarParts/BarTitleView');
var PromotionView = require('./App/Views/PromotionView');
var GlobalEvent   = require('./App/GlobalEvent');
var SimpleInput   = require('./App/Views/SimpleInput');
var TimeLineView  = require('./App/Views/TimeLineView');
var StreetView    = require('./App/Views/StreetView');
var NewPromotion  = require('./App/Views/NewPromotion');
var AutoComplete  = require('./App/AutoComplete/AutoCompleteView');
var UserView      = require('./App/Views/UserView');
var UserEditing   = require('./App/Views/UserEditingView');
var theme         = require('./App/theme');
var TagView       = require('./App/Views/TagView');
var Home          = require('./App/Views/Home');

var NavBar        = require('./App/NavBarParts/NavBar');
var Tools         = require('./App/Utilities');

var renderTitle =  function(navigator, index, state) {
	return  <BarTitleView 
				navigator={navigator}
    			index={index}
    			state={state}/>;
};

var renderRightButton = function(navigator, index, state) {
	let currentReoute = state.routeStack[index];
    return <RightButtons routeName={currentReoute.name}/>;
};

var renderLeftButton = function(navigator, index, state) {
	let currentReoute = state.routeStack[index];
	return <LeftButtons routeName={currentReoute.name} 
			navigator={navigator}
			index={index}
			state={state}/>;
};

// set status bar style
StatusBarIOS.setStyle('light-content');

var counter = 0;

var App = React.createClass({

	getInitialState: function() {
		// this.initialColor = theme.colors.MAIN;
		return { 
			navStyle: {
				backgroundColor: theme.colors.MAIN
			}
		};
	},

	setNavBarStyle: function(style) {
		this.setState({
			navStyle: style
		});
		// var colorValue = new Animated.Value(0);
		// var animatedColor = colorValue.interpolate({
	 //        inputRange: [0, 1], outputRange: [Tools.hexToRgbStr(this.initialColor), Tools.hexToRgbStr(backgroundColor)]
	 //    });

	 //    this.setState({
		// 	backgroundColor: animatedColor
		// });

	 //    Animated.spring(                         
	 //      colorValue,                
	 //      {
	 //        toValue: 1,                         
	 //        friction: 1,                          
	 //      }
	 //    ).start();
	},

	currentNarBarStyle: function() {
		return this.state.navStyle;
	},

	renderBar: function(props) {
		return (
			<Navigator.NavigationBar {...props} style={[props.style, this.state.navStyle]}/>
		);
	},

    pageWillFocus: function(route) {
    	GlobalEvent.trigger(route.name + '_willFocus', route);
    },

    pageWillBlur: function(route) {
    	GlobalEvent.trigger(route.name + '_willBlur', route);
    },

    pageDidFocus: function(route) {
    	GlobalEvent.trigger(route.name + '_didFocus', route);
    },

    pageDidBlur: function(route) {
    	GlobalEvent.trigger(route.name + '_didBlur', route);
    },

	render: function () {
			
		return <Router navigationBarStyle={{

							backgroundColor: theme.colors.MAIN,
							borderBottomWidth: 0
						}}

						barButtonTextStyle={{
							color: 'white'
						}}
						barButtonIconStyle={{
							tintColor: 'white'
						}}
						titleStyle={{
							color: 'white'
						}}
						
						onWillFocus={ this.pageWillFocus }
						onWillBlur={ this.pageWillBlur }
						onDidFocus={ this.pageDidFocus }
						onDidBlur={ this.pageDidBlur }

						currentNarBarStyle={ this.currentNarBarStyle }
						setNavBarStyle={ this.setNavBarStyle }
						
						renderTitle={ renderTitle }
						renderLeftButton={ renderLeftButton }
						renderRightButton={ renderRightButton }>
					
					<Schema hideNavBar={false} name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
	                <Schema hideNavBar={false} name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
	                
	                <Schema hideNavBar={false} name="none" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

	                <Schema hideNavBar={false} name="nonarbar" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
	                
	                <Route name="recorder" component={RecorderView} title="Record"/>
	                
	                <Route name="login" component={LoginView} initial={false} title="Login"/>
	                <Route name="signup" component={SignUpView} initial={false} title="Create Account"/>
	                
	                <Route name="user" component={UserView} initial={false} title="Profile" schema="nonarbar"/>

	                <Route name="editUser" component={UserEditing} initial={false} title="Edit Profile" schema="nonarbar"/>

	                <Route name="promotion" component={PromotionView} initial={false}  title="Promotion"/>
	                <Route name="timeline" component={TimeLineView} initial={false} title="Home"/>
	                <Route name="streetview" component={StreetView} initial={false} title="StreetView"/>
	                <Route name="tag" component={TagView} initial={false} title="Tag"/>

	                <Route name="home" component={Home} initial={true} title="Home"/>

	                
	                <Route name="newPromotion" component={NewPromotion} title="New Promtion" schema="modal"/>
	                <Route name="autoComplete" component={AutoComplete} title="AutoComplete" schema="none"/>

	                <Route name="simpleInput" component={SimpleInput} type="modal" title="SimpleInput"/>                
	                <Route name="toast" component={ToastView} type="modal" title="ToastView"/>

				</Router>

	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('VideoAdsReact', () => App);