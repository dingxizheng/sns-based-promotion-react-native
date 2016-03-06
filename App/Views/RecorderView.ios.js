/* 
* @Author: dingxizheng
* @Date:   2016-01-22 20:15:03
* @Last Modified by:   mover
* @Last Modified time: 2016-03-04 16:15:37
*/

'use strict';

var React              = require('react-native');
var Recorder           = require('react-native-screcorder');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');

var {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
} = React;

var VideoRecorder = React.createClass({

	mixins: [CustomButtonsMixin],

	getInitialState: function() {
		return {
			durationBarWidth: new Animated.Value(0)
		};
	},

	_onPressIn: function() {
		Animated.timing(this.state.durationBarWidth, {
			duration: 10000,
			toValue: 500
		}).start();
	},

	_onPressOut: function() {
		Animated.timing(this.state.durationBarWidth, {
			duration: 10,
			toValue: this.state.durationBarWidth
		}).start();
	},

	_getAnimatedSteyles: function() {
		return {
			width: this.state.durationBarWidth
		};
	},

	_renderBar: function() {
		return (
			<Animated.View style={[styles.durationBar, this._getAnimatedSteyles()]}/>
		);
	}, 

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	render: function() {
		var bar = this._renderBar();
		return (
			<View style={styles.wrapper}>
				
				<Recorder style={styles.recorder}>
				</Recorder>
				
				{bar}
				
				<View style={styles.controlsWrapper}>
					<View style={styles.controls}>
						
						<View style={[styles.control]}/>
						
						<View style={[styles.control]}>
							<TouchableOpacity style={styles.recordControl}
								onPressIn={this._onPressIn}
								onPressOut={this._onPressOut}>
								<View style={styles.recordControlCenter}>
								</View>
							</TouchableOpacity>
						</View>
						
						<View style={[styles.control]}/>
					
					</View>
				</View>
			
			</View>
		);
	}

});

// create styles
var styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: 'column'
	},
	recorder: {
		// height: 200,
		flex: .5
	},
	durationBar: {
		flex: .01,
		backgroundColor: theme.colors.MAIN
	},
	controlsWrapper: {
		flex: .15,
		// height: 50,
		backgroundColor: 'white',
		justifyContent: 'center',
		// flexDirection: 'column'
	},
	controls: {
		height:80,
		// backgroundColor: 'blue',
		flexDirection: 'row',
		alignItems: 'center'
	},
	control: {
		height: 80,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	recordControl: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderColor: theme.colors.MAIN,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	recordControlCenter: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: theme.colors.MAIN
	}
});


module.exports = VideoRecorder;