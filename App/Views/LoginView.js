/* 
* @Author: dingxizheng
* @Date:   2016-01-23 15:32:22
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-06 16:21:22
*/

'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');

var formStyles = require('../formStyles');
var theme = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');

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

var LoginForm = t.struct({
	email: t.String,
	password: t.String,
	rememberMe: t.Boolean
}); 

var options = {};

var LoginView = React.createClass({

	mixins: [CustomButtonsMixin],

	_handleRightClick: function() {
		console.log("RIGHT ...");
	},

	rightButtonsDidMount: function() {
		this.setRightButtons([
			{
				text: 'Register',
				onPress: this._handleRightClick
			}
		]);
	},

	leftButtonsDidMount: function() {

	},

	_handleLogin: async function() {
		
	},

	render: function() {
		return (
			<View style={styles.container}>
				
				<View style={styles.header} />
				
				<Form style={styles.form}
					ref="form"
					type={LoginForm}
					options={options}/>
				
				<TouchableOpacity style={styles.button}
					onPress={this._handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				
				<Text style={styles.onelineText}>or</Text>
				
				<TouchableOpacity style={styles.button}>
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