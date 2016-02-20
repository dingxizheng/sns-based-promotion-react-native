/* 
* @Author: dingxizheng
* @Date:   2016-01-23 15:32:22
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-20 16:42:19
*/

'use strict';

var React               = require('react-native');
var t                   = require('tcomb-form-native');
var formStyles          = require('../formStyles');
var theme               = require('../theme');
var CustomButtonsMixin  = require('../CustomButtonsMixin');
var {Account, Resource} = require('../apis');
var validator           = require('validator');
var LoadingView         = require('./LoadingView');
var FBSDKLogin          = require('react-native-fbsdklogin');
var FBSDKCore           = require('react-native-fbsdkcore');
var Actions             = require('react-native-router-flux').Actions;

var {
  FBSDKLoginManager,
} = FBSDKLogin;

var {
  FBSDKAccessToken,
} = FBSDKCore;

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} = React;

var {
  Actions
} = require('react-native-router-flux');

var Form = t.form.Form;
Form.stylesheet = formStyles;

var Email = t.refinement(t.String, function (n) { 
	return validator.isEmail(n);
});
Email.getValidationErrorMessage = function (value, path, context) {
  return 'Invalid email address';
};

var Password = t.refinement(t.String, function (n) { 
	return n.length > 5; 
});
Password.getValidationErrorMessage = function (value, path, context) {
  return 'Should be longer than 5 charaters'
};

var LoginForm = t.struct({
	email: Email,
	password: Password,
	// rememberMe: t.Boolean
}); 

var options = {
	fields: {
	    email: {
	    	value: 'nimama',
	        placeholder: 'you@example.com',
	        keyboardType: 'email-address',
	        autoCorrect: false,
	        autoCapitalize: 'none'
	    },
	    password: {
	    	placeholder: '_ _ _ _ _',
	    	password: true,
	    	autoCorrect: false,
	    	autoCapitalize: 'none'
	    }
	}
};

var permissions = ['public_profile', 'user_birthday', 'user_location', 'user_about_me', 'email'];

var LoginView = React.createClass({

	mixins: [CustomButtonsMixin],

	getInitialState: function() {
	  return {
	    value: {
	    	email: '',
	    	password: ''
	    },
	    loading: false
	  };
	},

	componentDidMount: async function() {
		// console.log("good");
		// try {
		// 	var account = await storage.load({ key: 'savedAccount' });
		// 	this.setState({
		// 		value: {
		// 			email: account.email,
		// 			password: account.password
		// 		} 
		// 	});
		// } catch(e) {
		// 	console.log(e);
		// }
	},

	_viaFacebook: function() {
		FBSDKLoginManager.logInWithReadPermissions(permissions, (error, result) => {
		  if (error) {
		     Actions.toast({msg: 'Can not login via facebook', type: 'error'});
		  } else {
		    if (!result.isCancelled) {
		    	FBSDKAccessToken.getCurrentAccessToken(async function(token) {
		    		console.log({access_token: token.tokenString})
		    		try {
			    		var res = await Resource.fetch('https://graph.facebook.com/me', {
			    			query:{
			    				access_token: token.tokenString,
			    				fields: 'id,email,name,birthday'
			    			}
			    		});
			    		this._onFacebookLogedIn(await res.json(), token.tokenString);
			    	} catch(e) {
			    		console.log(e);
			    	}
		    	}.bind(this));
		    }
		  }
		});
	},

	_onFacebookLogedIn: async function(user, access_token) {
		try {
			var session = await Account.facebook({
							body: Object.assign({ provider_access_token: access_token }, user)
						});
			this._saveSession(session);
		} catch(e) {
			console.log(e);
		}
	},

	// save session
	_saveSession: function(session) {
		storage.save({
		    key: 'loginState',
		    rawData: session,
		    expires: 1000 * 3600
		});
	},

	rightButtonsDidMount: function() {
		this.setRightButtons([
			{
				text: 'New User?',
				onPress: Actions.signup
			}
		]);
	},

	leftButtonsDidMount: function() {

	},

	componentWillReceiveProps: function(nextProps) {
	  console.log(nextProps);
	},

	_handleLogin: async function() {
		var value = this.refs.form.getValue();
		if (value) {
			this.setState({loading: true });
			try {
				
				var session = await Account.signin({body: value});
				this._saveSession(session);
			
			} catch(e) {
				console.log(e);
				this.setState({
					value: value,
					loading: false
				});
			}
		}
	},

	render: function() {
		console.log("back", this.props.user);
		return (
			<View style={styles.container}>

				<LoadingView isVisible={this.state.loading} />
				
				<View style={styles.header} />
				
				<Form style={styles.form}
					ref="form"
					type={LoginForm}
					value={this.state.value}
					options={options}/>
				
				<TouchableOpacity style={styles.button}
					onPress={this._handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				
				<Text style={styles.onelineText}>or</Text>
				
				<TouchableOpacity style={styles.button} onPress={this._viaFacebook}>
					<Text style={styles.buttonText}>Facebook</Text>
				</TouchableOpacity>				
			
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	header: {
		// height: 50
	},
	form: {
		// marginTop: 50
	},
	buttons: {

	},
	onelineText: {
		textAlign: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	button: {
		height: theme.buttons.BUTTON_HEIGHT,
		borderColor: theme.colors.MAIN,
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'center',
		alignSelf: 'stretch',
		// marginBottom: 20
	},
	buttonText: {
		fontSize: theme.fonts.FONT_SIZE,
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_WEIGHT,
		alignSelf: 'center'
	}
});

module.exports = LoginView;