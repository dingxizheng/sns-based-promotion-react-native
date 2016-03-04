/* 
* @Author: dingxizheng
* @Date:   2016-02-02 18:59:43
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 15:52:39
*/

'use strict';

var React = require('react-native');
var Icon  = require('react-native-vector-icons/MaterialIcons');
var Tools = require('../Utilities');
var theme   = require('../theme');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} = React;

var AnimatedIcon = Animated.createAnimatedComponent(Icon);
var AnimatedText = Animated.createAnimatedComponent(Text);


var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
    // paddingBottom: 10,
  },
  tabs: {
    height: 35,
    flexDirection: 'row',
    // paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  icon: {
    color: theme.colors.GREY_FONT,
    fontSize: 15,
    padding: 2
  },
  text: {
    color: theme.colors.GREY_FONT,
    fontSize: 12,
    padding: 2
  },
});

var FacebookTabBar = React.createClass({
  tabColors: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    //   isTabActive = this.activeTab === page;   
    // } else {
    //   this.activeTab = this.props.activeTab;
    // }
    
    // this.tabColors[page] = new Animated.Value(isTabActive ? 0 : 1);

    // var color = this.tabColors[page].interpolate({
    //     inputRange: [0, 1], outputRange: [Tools.hexToRgbStr(theme.colors.MAIN), Tools.hexToRgbStr(theme.colors.GREY_FONT)]
    // });

    var color = isTabActive ? theme.colors.MAIN : theme.colors.GREY_FONT;

    if (this.props.type == "icon-only")
      return (
        <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={[styles.tab, {flex: 1 / this.props.tabs.length}]}>
          <Icon name={name} style={[styles.icon, this.props.iconStyle, {color}]}/>
        </TouchableOpacity>
      );
    else if (this.props.type == "text-only")
      return (
        <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={[styles.tab, {flex: 1 / this.props.tabs.length}]}>
          <Text style={[styles.text, {color}]}>{name}</Text>
        </TouchableOpacity>
      );
    else
      return (
        <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={[styles.tab, {flex: 1 / this.props.tabs.length}]}>
          <Icon name={name.split('|')[0]} style={[styles.icon, this.props.iconStyle, {color}]}/>
          <Text style={[styles.text, {color}]}>{name.split('|')[1]}</Text>
        </TouchableOpacity>
      );

  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    // this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    // this.tabColors.forEach(function(colorValue, page) {
    //   if (value - page >= 0 && value - page <= 1) {
    //       colorValue.setValue(value - page);
    //     }

    //   if (page - value >= 0 && page - value <= 1) {
    //      colorValue.setValue(page - value);
    //   } 
    // });
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.underLineHeight || 2,
      backgroundColor: theme.colors.MAIN || this.props.underLineColor,
      [this.props.tabBarPosition === 'top' ? 'top' : 'bottom']: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

module.exports = FacebookTabBar;