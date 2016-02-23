/* 
* @Author: dingxizheng
* @Date:   2016-02-21 14:05:33
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 14:39:11
*/

var React   = require('react-native');
var Spinner = require('react-native-spinkit');
var theme   = require('../theme');

var {
  StyleSheet,
  View,
  Text,
} = React;

var BusyBox = React.createClass({
  
  render: function() {

    return (
        <View style={[styles.header, this.props.style]}>
     		<Spinner isVisible={this.props.isVisible} size={20} type={"Wave"} color={"#bbbbbb"}/>
     		{function(){
     			if (this.props.text)
     				return <Text style={styles.text}>{this.props.text}</Text>
     		}.bind(this).call()}
        </View>
    );
  }

});


var styles = StyleSheet.create({
	header: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
    	color: '#bbbbbb',
        fontSize: 17,
        paddingLeft: 14,
    }
});

module.exports = BusyBox;