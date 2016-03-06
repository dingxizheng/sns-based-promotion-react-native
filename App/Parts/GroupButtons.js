/* 
* @Author: dingxizheng
* @Date:   2016-02-02 13:19:21
* @Last Modified by:   mover
* @Last Modified time: 2016-03-05 20:47:01
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
	LayoutAnimation
} = React;

var GroupButtons = React.createClass({

	getInitialState: function() {
		return {
			buttons: this.props.buttons,
			selected: (this.props.selected * 2) || 0, 
		};
	},

	componentWillReceiveProps: function(nextProps) {
	   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	   this.setState({
	  		buttons: nextProps.buttons,
			selected: (nextProps.selected * 2) || 0, 	
	   });
	},

	_onOuterLaoyut: function(e) {
		// console.log(this._buttons);
		// console.log(Math.max(...this._buttons));
	},

	_onLayout: function(e, i) {
		// this._buttons = this._buttons || {};
		// this._buttons[i] = e.nativeEvent.layout.width;
	},

	_onPressed: function(b, i) {
	   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setState({ selected: i});
		this.props.onPress && this.props.onPress(b, i === 0 ? i : i / 2);
	},

	render: function() {
		var buttons = this.state.buttons.slice(0);

		var _str_ = buttons.join("__END__-(-)-__END__");

		var buttons = _str_.split('__END__');

		if (this.state.buttons.length < 2)
			return null;

		return (
			<View style={[styles.container, this.props.style]} onLayout={this._onOuterLaoyut}>
				{buttons.map((b, i)=> {
					if (b === '-(-)-') {
						return <View key={i} style={styles.separator} />
					}

					if (this.state.selected === i)
						return <View key={i} onLayout={(e) => this._onLayout(e, i)}>
									<Text style={styles.buttonSelected}>{b}</Text>
							   </View>

					return <TouchableOpacity key={i} onLayout={(e) => this._onLayout(e, i)} onPress={() => this._onPressed(b, i)}>
							  <Text style={styles.button}>{b}</Text>
						   </TouchableOpacity>
				})}
			</View>
		);
	},

});


var BottomItem = React.createClass({
	render: function() {
		return null;
	},
});

var styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: theme.colors.MAIN,
		borderWidth: 1,
		borderRadius: 4,
		overflow: 'hidden'
	},
	separator: {
		alignSelf: 'center',
		width: 0.5,
		// backgroundColor: '#ddd',
	},
	buttonWrapper: {

	},
	buttonSelected: {
		backgroundColor: theme.colors.MAIN,
		color: 'white',
		paddingHorizontal: 8,
		paddingVertical: 2,
		fontSize: 13,
		textAlign: 'center'
	},
	button: {
		// backgroundColor: 'white',
		color: theme.colors.MAIN,
		paddingHorizontal: 8,
		paddingVertical: 2,
		fontSize: 13,
		textAlign: 'center'
	}
});

module.exports = GroupButtons
