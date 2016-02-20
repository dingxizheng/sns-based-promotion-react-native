/* 
* @Author: dingxizheng
* @Date:   2016-02-19 20:27:31
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-19 21:13:36
*/

'use strict';

var React   = require('react-native');
var Spinner = require('react-native-spinkit');
var Overlay = require('react-native-overlay');
var theme   = require('../theme');

var {
  StyleSheet,
  View,
  Text,
  Dimensions
} = React;

var {height, width} = Dimensions.get('window');

var Loading = React.createClass({
  
  render: function() {

    return (
      <Overlay isVisible={this.props.isVisible}>
        
        <View style={styles.container} >
         	<View style={styles.header}>
         		<Spinner isVisible={this.props.isVisible} size={25} type={"Wave"} color={"#ffffff"}/>
         		{function(){
         			if (this.props.text)
         				return <Text style={styles.text}>{this.props.text}</Text>
         		}.bind(this).call()}
         	</View>
        </View>

      </Overlay>
    );

  }

});


var styles = StyleSheet.create({
	container: {
		height: height,
		width: width,
		backgroundColor: '#55555555'
	},
	header: {
        height: 64,
        flexDirection: 'row',
        backgroundColor: theme.colors.MAIN,
        justifyContent: 'flex-start',
        paddingTop: 35,
        paddingLeft: 20
    },
    text: {
    	color: '#FFF',
        fontSize: 17,
        paddingLeft: 14,
    }
});


module.exports = Loading;
