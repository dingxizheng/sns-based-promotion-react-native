/* 
* @Author: dingxizheng
* @Date:   2016-01-23 13:24:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-23 20:09:18
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

require('./storage');
require('./App/httpmiddlewares');

var RecorderView     = require('./App/Views/RecorderView.ios');
var LoginView        = require('./App/Views/LoginView');
var SignUpView       = require('./App/Views/SignUpView');
var ToastView        = require('./App/Views/ToastView');
var RightButtons     = require('./App/Views/RightActionButtons');
var LeftButtons      = require('./App/Views/LeftActionButtons');
var BarTitleView     = require('./App/Views/BarTitleView');
var PromotionView    = require('./App/Views/PromotionView');
var GlobalEvent      = require('./App/GlobalEvent');
var SimpleInput      = require('./App/Views/SimpleInput');
var CommentsView     = require('./App/Views/CommentsView');
var TimeLineView     = require('./App/Views/TimeLineView');
var StreetView       = require('./App/Views/StreetView');
var LikesAndComments = require('./App/Views/CommentsAndLikes');
var NewPromotion     = require('./App/Views/NewPromotion');
var AutoComplete     = require('./App/AutoComplete/AutoCompleteView');

// set status bar style
StatusBarIOS.setStyle('light-content');

var counter = 0;

var App = React.createClass({

	getInitialState: function() {
		return { 
			isToastViewVisible: true 
		};
	},

	renderTitle: function(navigator, index, state) {
		return  <BarTitleView 
					navigator={navigator}
	    			index={index}
	    			state={state}/>;
	},

	renderRightButton: function(navigator, index, state) {
		let currentReoute = state.routeStack[index];
        return <RightButtons routeName={currentReoute.name}/>;
    },

    renderLeftButton: function(navigator, index, state) {
    	let currentReoute = state.routeStack[index];
    	return <LeftButtons routeName={currentReoute.name} 
    			navigator={navigator}
    			index={index}
    			state={state}/>;
    },

	render: function () {
			
		return <Router  hideNavBar={false}
						navigationBarStyle={{
							backgroundColor: '#1E90FF'
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
						renderTitle={ this.renderTitle }
						renderLeftButton={ this.renderLeftButton }
						renderRightButton={ this.renderRightButton }>
					
					<Schema hideNavBar={false} name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
	                <Schema hideNavBar={false} name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
	                <Schema hideNavBar={false} name="none" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
	                
	                <Route name="recorder" component={RecorderView} title="Record"/>
	                
	                <Route name="login" component={LoginView} initial={false} title="Login"/>
	                <Route name="signup" component={SignUpView} initial={false} title="Create Account"/>
	                
	                <Route name="promotion" component={PromotionView} initial={false}  title="Promotion"/>
	                <Route name="comments" component={CommentsView} title="Comments"/>
	                <Route name="timeline" component={TimeLineView} initial={true} title="Home"/>
	                <Route name="streetview" component={StreetView} initial={false} title="StreetView"/>
	                <Route name="comments_and_likes" component={LikesAndComments} initial={false} title="Likes"/>
	                
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