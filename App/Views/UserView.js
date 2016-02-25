/* 
* @Author: dingxizheng
* @Date:   2016-02-23 21:25:31
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-25 02:23:17
*/

'use strict';

var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;
var theme              = require('../theme');
var moment             = require('moment');
var HTMLView           = require('react-native-htmlview');
var ImageGroup         = require('./ImagesView');
var TagsView           = require('./TagsView');
var ParallaxScrollView = require('react-native-parallax-scroll-view');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin         = require('react-timer-mixin');

var {TableView, Section, Cell, CustomCell} = require('react-native-tableview-simple');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');
// var {StatusView, StatusItem}    = require('./StatusView');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image,
	TextInput
} = React;

var UserView = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	getInitialState: function() {
	    return {
	    };
	},

	titleViewDidMount: function() {
        this.setTitleView(<View/>);
    },

	componentDidFocus: function() {
		var i = 9;
		var interval = this.setInterval(() =>{
			i --;
			this.props.setNavBarStyle({
				backgroundColor: this.previousNavbarStyle.backgroundColor + i + '' + i,
				// height: 0
			});
			if (i === 0) {
				clearInterval(interval);
			}
		}, 4);
	},

	_onChangeHeaderVisibility: function(e) {
		// if (!e) {
		// 	this.setTitleView("Dingxizheng");
		// } else {
		// 	this.setTitleView(<View/>);
		// }
	},

	_renderForeground: function() {
		return (
			<View style={styles.foreground}>
				<Image style={styles.avatar} 
					defaultSource={require('../../images/default_profile.jpg')}/>
				<Text style={styles.userName}>{"Dingxizheng"}</Text>
				<View style={{ height: 40}}>
					<StatusView>
						<StatusItem text="Follow" name="125" textStyle={{ fontSize: 15, color: 'white' }}/>
						<StatusItem text="Follower" name="25" textStyle={{ fontSize: 15, color: 'white' }}/>
						<StatusItem text="Likes" name="20" textStyle={{ fontSize: 15, color: 'white' }}/>
					</StatusView>
				</View>
			</View>
		);
	},

	_renderBackground: function() {
		return (
			<View style={styles.background}>
				<Image style={{flex:1, resizeMode: 'cover'}} 
					defaultSource={require('../../images/bg2.jpg')}/>
				<View style={styles.viewMask}/>
		 	</View>
		);
	},

	_renderStickyHeader: function() {
		return (
			<View style={styles.stickyHeader}>
				<Text style={styles.stickrHeaderName}>{"Dingxizheng"}</Text>
		 	</View>
		);
	},
	
	render: function() {
		
		// var {avatar, name} = this.props.user;

		return (
			<View style={styles.container}>
			<ParallaxScrollView
				style={{flex: 1}}
		      	backgroundColor="#EFEFF4"
		      	contentBackgroundColor="#EFEFF4"
		      	parallaxHeaderHeight={300}
		      	stickyHeaderHeight={64}
		      	onChangeHeaderVisibility={this._onChangeHeaderVisibility}
		      	renderStickyHeader={this._renderStickyHeader}
		      	renderBackground={this._renderBackground}
		      	renderForeground={this._renderForeground}>
			      
			   <TableView>
	            	<Section>
		              	<CustomCell cellHeight={200}>
			              <Text style={styles.cellLabel}>Tags</Text>
			              <View style={styles.cellContent}>
			              		<TagsView tags={["promotion", "cellContent", "good", "boy", "hello"]}/>
			              </View>
			            </CustomCell>
			            <CustomCell cellHeight={60}>
			              <Text style={styles.cellLabel}>Location</Text>
			              <View style={styles.cellContent}>
			              	<Text style={[styles.cellText, {color: theme.colors.MAIN}]}>472 Rupert Street. Ontario, Canada</Text>
			              </View>
			            </CustomCell>
			            <CustomCell cellHeight={60}>
			              <Text style={styles.cellLabel}>Intro</Text>
			              <View style={styles.cellContent}>
			              	<Text style={styles.cellText}>Configure all of your screens ("routes") once (define animations, nav bars, etc.), at one place and then just use short actions commands. For example if you</Text>
			              </View>
			            </CustomCell>
	            	</Section>

	            	<Section>
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Promotions" detail="124" />
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Photos" detail="12" />
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Comments" detail="1234" />
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Who liked him?" detail="12" />
		          </Section>
	         	</TableView>
		    </ParallaxScrollView>
		    <BottomActions style={{ height: 50 }} separatorHeight={20} >
					<BottomItem text="Follow" icon="person-add" textStyle={{ fontSize: 15}}/>
					<BottomItem icon="favorite-border" text="like" textStyle={{ fontSize: 15}}/>
			</BottomActions>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'column',
		marginTop: 0,
	},
	background: {
		height: 300,
		flex: 1
	},
	foreground: {
		height: 300,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
	},
	viewMask: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#22222244'
	},
	stickyHeader: {
		paddingTop: 20,
		flex: 1,
		height: 64,
		backgroundColor: theme.colors.MAIN,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10
	},
	stickrHeaderName: {
		textAlign: 'center',
		color: 'white',
		fontSize: 17,
		padding: 10,
	},
	avatar: {
		borderWidth: 1,
		borderColor: '#bbbbbb',
		borderRadius: 35,
		height: 70,
		width: 70
	},
	userContent: {
		padding: 0,
		paddingBottom: 0,
		paddingTop: 0,
		justifyContent: 'center'
	},
	userName: {
		alignSelf: 'stretch',
		textAlign: 'center',
		color: 'white',
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: 20,
		padding: 10,
		paddingBottom: 5,
	},
	cellLabel: {
        flex: 0.25,
        fontSize: 16,
        color: '#999'
        // backgroundColor: '#eee'
    },
    cellContent: {
    	flex: 0.75,
    },
    cellText: {
    	fontSize: 13,
        color: theme.colors.DARK_GREY_FONT
    }
});

module.exports = UserView;
