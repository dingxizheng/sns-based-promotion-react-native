/* 
* @Author: dingxizheng
* @Date:   2016-01-31 17:23:24
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-31 18:40:26
*/

'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableOpacity, TextInput} = React;
var Actions = require('react-native-router-flux').Actions;
var BlurView    = require('react-native-blur').BlurView;
var Icon        = require('react-native-vector-icons/MaterialIcons');
var theme = require('../theme');

var MakeComment = React.createClass({

	onChangeText: function(text) {
		this.inputText = text;
	},

	onDone: function() {
		var ondone = this.props.onDone || function() {};
		if (this.inputText && this.inputText.length > 0) {
			ondone(this.inputText) && Actions.dismiss();
		}
	},

	render: function() {
	
		return (
			<BlurView style={styles.container} blurType="light">
				<View style={styles.contentWrapper}>
					<View style={styles.header}>
						
						<TouchableOpacity style={styles.headerClose} onPress={Actions.dismiss}>
							<Icon name="close" style={styles.footerMenuItemIcon}/>
						</TouchableOpacity>

						<View style={styles.headerTitle}>
							<Text style={styles.headerTitleText}>{ this.props.title || "New Comment"}</Text>
						</View>
						
					</View>
					
					<View style={styles.content}>

						<TextInput onChangeText={this.onChangeText} style={styles.contentInput} multiline={true} autoFocus={true} placeholder={	this.props.placeholder || "put your comment here..." }/>

					</View>
					
					<View style={styles.footer}>
						<TouchableOpacity style={styles.footerMenuItemWrapper}>
						</TouchableOpacity>
						<TouchableOpacity style={styles.footerMenuItemWrapper}>
						</TouchableOpacity>
						<TouchableOpacity style={styles.footerMenuItemWrapper} onPress={this.onDone}>
							<Icon name={this.props.buttonIcon || 'check'} style={styles.footerMenuItemIcon}/>
							<Text style={styles.footerMenuItemText}>{this.props.buttonName || 'Send'}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BlurView>
		);
	}
});

var styles = StyleSheet.create({
	container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
    	marginLeft: 10,
    	marginRight: 10,
  //   	borderWidth: 1,
		// borderColor: '#bbbbbb',
		borderRadius: 5,
		flexDirection: 'column',
		alignSelf: 'stretch',
		backgroundColor: 'white'
    },
    header: {
    	height: 45,
    	flexDirection: 'row',
    	backgroundColor: '#eeeeee',
    	borderBottomColor: '#eeeeee',
		borderBottomWidth: .5
    },
    headerTitle: {
    	flex: .9,
    	justifyContent: 'center',
        paddingLeft: 10,
    },
    headerTitleText: {
    	color: theme.colors.GREY_FONT,
    },
    headerClose: {
    	flex: 0.1,
    	justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
    	flexDirection: 'column',
    	padding: 10,
    },
    contentInput: {
    	height: 100,
    	fontSize: 17,
    	color: theme.colors.GREY_FONT,
    },
    footer: {
		height: 45,
		flexDirection: 'row',
		borderTopColor: '#eeeeee',
		borderTopWidth: .5
	},
	footerMenuItemWrapper: {
		flex: .333,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	footerMenuItemIcon: {
		color: theme.colors.GREY_FONT,
	    fontSize: 22,
	    padding: 3
	},
	footerMenuItemText: {
		color: theme.colors.GREY_FONT,
	    fontSize: 13,
	    padding: 3
	},
});

module.exports = MakeComment;