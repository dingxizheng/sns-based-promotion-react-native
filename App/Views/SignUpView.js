/* 
* @Author: dingxizheng
* @Date:   2016-01-23 15:47:26
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-20 16:39:53
*/

'use strict';
/* 
* @Author: dingxizheng
* @Date:   2016-01-23 15:32:22
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-20 13:51:39
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
var Actions             = require('react-native-router-flux').Actions;
var KeyboardSpacer      = require('react-native-keyboard-spacer');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var {
  Actions
} = require('react-native-router-flux');

var Form = t.form.Form;
Form.stylesheet = formStyles;

var formValue = {};

var Name = t.refinement(t.String, function (n) { 
	return validator.isLength(n, { min: 5, max: 20 });
});

Name.getValidationErrorMessage = function (value, path, context) {
	if (value && value.length < 5)
  		return 'Name is too short';
  	else if (value && value.length > 20)
  		return 'Name is too long';
  	else
  		return 'Should not be blank';
};

var Email = t.refinement(t.String, function (n) { 
	return validator.isEmail(n);
});
Email.getValidationErrorMessage = function (value, path, context) {
  if (value)
  	return 'Invalid email address';
  else
  	return 'Should not be blank';
};

var Password = t.refinement(t.String, function (n) {
	formValue.password = n;
	return n.length > 5; 
});
Password.getValidationErrorMessage = function (value, path, context) {
  return 'Should contain more than 5 charaters';
};

var Confirm = t.refinement(t.String, function (n) { 
	return n === (formValue.password); 
});
Confirm.getValidationErrorMessage = function (value, path, context) {
   return 'Does not match above';
};

var SignupForm = t.struct({
	name: Name,
	email: Email,
	password: Password,
	confirm: Confirm
	// rememberMe: t.Boolean
}); 

var options = {
	fields: {
		name: {
			placeholder: '_ _ _ _ _ ',
			autoCorrect: false,
			autoCapitalize: 'none'
		},
	    email: {
	        placeholder: 'you@example.com',
	        keyboardType: 'email-address',
	        autoCorrect: false,
	        autoCapitalize: 'none'
	    },
	    password: {
	    	placeholder: '_ _ _ _ _',
	    	password: true,
	    	autoCorrect: false
	    },
	    confirm: {
	    	placeholder: '_ _ _ _ _',
	    	password: true,
	    	autoCorrect: false,
	    	returnKeyType: 'join'
	    }
	}
};

var SignupView = React.createClass({

	mixins: [CustomButtonsMixin],

	getInitialState: function() {
	  return {
	    value: {
	    	name: '',
	    	email: '',
	    	password: '',
	    	confirm: '',
	    },
	    loading: false
	  };
	},

	onChange: function() {
		// this.refs.form.getValue();
	},

	_handleRightClick: function() {
		console.log("RIGHT ...");
	},

	_handleSignup: async function() {
		var value = this.refs.form.getValue();
		if (value) {
			this.setState({loading: true});
			try {
				var result = await Account.signup({ body: value });
				
				this.setState({loading: false});

				storage.save({
				    key: 'savedAccount',
				    rawData: value,
				});
				
				Actions.pop(1, {user: value});
				
				Actions.toast({msg: "Account Created Successfully!", type: 'info'});
			
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
		return (
			<ScrollView style={styles.containerWrapper}>
				<View style={styles.container}>
					<LoadingView isVisible={this.state.loading} />

					<View style={styles.header} />
					
					<Form style={styles.form}
						ref="form"
						type={SignupForm}
						onChange={this.onChange}
						value={this.state.value}
						options={options}/>
					
					<TouchableOpacity style={styles.button}
						onPress={this._handleSignup}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
					<KeyboardSpacer/>		
				</View>
			</ScrollView>
		);
	}
});

var styles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		marginTop: 64
	},
	container: {
		flex: 1,
		padding: 20,
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

module.exports = SignupView;