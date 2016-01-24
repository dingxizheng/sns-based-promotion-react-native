/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
} = require('react-native-router-flux')

var FBSDKLogin = require('react-native-fbsdklogin');
var FBSDKCore = require('react-native-fbsdkcore');

var {
  FBSDKLoginButton,
} = FBSDKLogin;
var {
  FBSDKGraphRequest,
  FBSDKAccessToken
} = FBSDKCore;

var fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
},
'/me',
{
  fields: { string: "id,birthday,email,gender,cover,name" }
});
// Start the graph request.

var VideoAdsReact = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
                fetchFriendsRequest.start();
                FBSDKAccessToken.getCurrentAccessToken((token)=>{
                  console.log(token);
                });
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={['email', 'public_profile', 'user_friends']}
          publishPermissions={['publish_actions']}/>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('VideoAdsReact', () => VideoAdsReact);
