/*
* @Author: dingxizheng
* @Date:   2016-03-03 15:54:56
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 16:35:47
*/

var React = require('react-native');
var theme = require('../theme');
var Icon  = require('react-native-vector-icons/MaterialIcons');
var Spinner = require('react-native-spinkit');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} = React;

var EmptyView = React.createClass({

  getInitialState: function() {
    return {
       loading: this.props.loading, 
       buttonText: this.props.buttonText,
       text: this.props.text
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      loading: nextProps.loading,
      buttonText: nextProps.buttonText,
      text: nextProps.text,
    });
  },

  _onTouch: function() {
  	 this.props.onPress && this.props.onPress();
  },

  _renderIcon: function() {
    if (this.state.loading)
      return <Spinner isVisible={true} size={70} type={"Wave"} color={"#dddddd"}/>

    return <Icon name="mood" size={70} style={{ color: '#ddd' }}/>;

  },

  _renderButton: function() {
    if (this.state.loading)
      return null;

    if (this.state.buttonText)
      return <TouchableOpacity onPress={this._onTouch}>
                <Text style={styles.button}>{this.state.buttonText}</Text>
             </TouchableOpacity>

    return null;
  },
  
  render: function() {
    return (
        <View style={[styles.container, this.props.style]} >
     		   <Text style={styles.text}>{this.state.loading ? "loading..." : this.state.text}</Text>
     		   {this._renderIcon()}
           {this._renderButton()}
        </View>
    );
  }

});


var styles = StyleSheet.create({
	container: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
    	  color: '#ddd',
        fontSize: 17,
        padding: 10,
        paddingBottom: 10,
    },
    button: {
        textAlign: 'center',
        borderRadius: 4,
        borderColor: '#aaa',
        borderWidth: 1,
        color: '#aaa',
        fontSize: 17,
        padding: 5,
        margin: 5
    },
});

module.exports = EmptyView;