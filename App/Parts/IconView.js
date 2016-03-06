/* 
* @Author: dingxizheng
* @Date:   2016-02-02 13:19:21
* @Last Modified by:   mover
* @Last Modified time: 2016-03-06 16:24:58
*/

'use strict';

var React = require('react-native');
var formStyles = require('../formStyles');
var theme = require('../theme');
var Icon  = require('react-native-vector-icons/MaterialIcons');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	LayoutAnimation,
	Image
} = React;

var IconView = React.createClass({

	getInitialState: function() {
		return {
		};
	},


	_onPress: function() {
	   	this.props.onPress && this.props.onPress();
	},

	render: function() {
		var Outer = this.props.onPress ? TouchableOpacity : View;

		return (
			<Outer style={[styles.container, this.props.style]} onPress={this._onPress}>
				<View style={[styles.leftIcon, {}]}>
				{(()=>{
					if (this.props.icon === true) 
						return  <Icon name={this.props.leftIcon} style={{ fontSize: this.props.leftIconSize || 17, color: this.props.leftIconColor || theme.colors.MAIN }} />
								

					return <Image 
							source={{ uri: this.props.leftIcon }} 
							style={{ 
								height: this.props.leftIconSize, 
								width: this.props.leftIconSize,
								borderRadius: this.props.leftIconSize / 2
							}}/>
				})()}
				</View>
				<View style={styles.content}>
					{this.props.children}
				</View>
				{(()=>{
					if (this.props.rightIcon) 
						return  <View style={styles.rightIcon}>
									<Icon name={this.props.rightIcon} style={{ fontSize: 17, color: this.props.rightIconColor || theme.colors.MAIN }} />
								</View>
					return null
				})()}
				
			</Outer>
		);
	},

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	leftIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		// padding: 10
	},
	rightIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	},
	content: {
		flex: 1
	},
});

module.exports = IconView;
