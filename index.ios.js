/* 
* @Author: dingxizheng
* @Date:   2016-01-23 13:24:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-08 18:42:01
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

require('./App/httpTest');

var RecorderView = require('./App/Views/RecorderView.ios');
var LoginView    = require('./App/Views/LoginView');
var ToastView    = require('./App/Views/ToastView');
var RightButtons = require('./App/Views/RightActionButtons');
var LeftButtons  = require('./App/Views/LeftActionButtons');
var PromotionView= require('./App/Views/PromotionView');
var GlobalEvent  = require('./App/GlobalEvent');
var MakeComment  = require('./App/Views/MakeComment');
var CommentsView = require('./App/Views/CommentsView');
var TimeLineView = require('./App/Views/TimeLineView');
var StreetView   = require('./App/Views/StreetView');
var LikesAndComments = require('./App/Views/CommentsAndLikes');

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
		return  <View style={styles.barTitleTextWrapper}>
				 <Text style={styles.barTitleText}>{title}</Text>
				</View>;
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
		
		return <Router navigationBarStyle={{
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
					
					<Schema hideNavBar={true} name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
	                <Schema hideNavBar={false} header={() => toastView} name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
	                <Route name="recorder" component={RecorderView} title="Record"/>
	                <Route name="login" component={LoginView} title="Login"/>
	                <Route name="promotion" component={PromotionView} initial={false}  title="Promotion"/>
	                <Route name="comments" component={CommentsView} title="Comments"/>
	                <Route name="timeline" component={TimeLineView} initial={true} title="Timeline"/>
	                <Route name="comment" component={MakeComment} type="modal" title="Make a Comment"/>
	                <Route name="streetview" component={StreetView} initial={false} title="StreetView"/>
	                <Route name="comments_and_likes" component={LikesAndComments} initial={false} title="Likes"/>

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