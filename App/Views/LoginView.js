/* 
* @Author: dingxizheng
* @Date:   2016-01-23 15:32:22
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-25 12:20:25
*/

'use strict';

var React = require('react-native');
var Recorder = require('react-native-screcorder');
var t = require('tcomb-form-native');

var formStyles = require('../formStyles');
var theme = require('../theme');
var accountApis = require('../apiCalls').accounts;

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} = React;

var Form = t.form.Form;

Form.stylesheet = formStyles;

var LoginForm = t.struct({
	email: t.String,
	password: t.String,
	rememberMe: t.Boolean
});

var options = {};

var LoginView = React.createClass({

	_handleLogin: async function() {
		try {
			var res = await accountApis.login({
						method: 'POST',
						body: {
							email: 'dingxizheng@gmail.com',
							password: 'hello'
						}
					});

			console.log(await res.json());

		} catch (err) {
			console.log(err);
		}
		
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