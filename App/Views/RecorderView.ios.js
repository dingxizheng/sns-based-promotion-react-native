/* 
* @Author: dingxizheng
* @Date:   2016-01-22 20:15:03
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-23 15:45:53
*/

'use strict';

var React = require('react-native');

var Recorder = require('react-native-screcorder');

var {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
} = React;

var VideoRecorder = React.createClass({

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
			duration: 400,
			toValue:0
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

	render: function() {
		var bar = this._renderBar();
		
		console.log(styles.wrapper);
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
		backgroundColor: 'pink'
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
		borderColor: 'pink',
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	recordControlCenter: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: 'pink'
	}
});


module.exports = VideoRecorder;