/* 
* @Author: dingxizheng
* @Date:   2016-02-23 21:25:31
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-25 14:51:47
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
	    	user: this.props.user,
	    	fullIntro: false
	    };
	},

	titleViewDidMount: function() {
        this.setTitleView(<View/>);
    },

	componentDidFocus: function() {
		this.props.setNavBarStyle({
			backgroundColor: this.previousNavbarStyle.backgroundColor + '00',
			// height: 0
		});
	},

	componentWillMount: function() {
		// console.log("part", this.props.user.data);
		this.props.user.fetch().then(function(e) {
			console.log("full", e);
			this.setState({ user: this.props.user });
		}.bind(this));
	},

	_onChangeHeaderVisibility: function(e) {
		// if (!e) {
		// 	this.setTitleView("Dingxizheng");
		// } else {
		// 	this.setTitleView(<View/>);
		// }
	},

	_renderForeground: function() {
		var {avatar, name} = this.state.user.data;
		avatar = avatar || {};
		return (
			<View style={styles.foreground}>
				<Image style={styles.avatar}
					source={{ uri: avatar.thumb_url }}
					defaultSource={require('../../images/default_profile.jpg')}/>
				<Text style={styles.userName}>{name}</Text>
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
		var {background} = this.state.user.data;
		background = background || {};
		return (
			<View style={styles.background}>
				<Image style={{flex:1, resizeMode: 'cover'}} 
					source={{ uri: background.image_url }}
					defaultSource={require('../../images/wood.jpg')}/>
				<View style={styles.viewMask}/>
		 	</View>
		);
	},

	_renderStickyHeader: function() {
		var {name} = this.state.user.data;
		return (
			<View style={styles.stickyHeader}>
				<Text style={styles.stickrHeaderName}>{name}</Text>
		 	</View>
		);
	},

	_renderIntro: function (argument) {
		var {description} = this.state.user.data;
		if(!this.state.fullIntro && description && description.length > 100) {
			description = description.substring(0, 97);
			return <Text style={styles.cellText}>{description}<Text style={{color: theme.colors.MAIN}}> ...more</Text></Text>;
		}
		return <Text style={styles.cellText}>{description || 'none'}</Text>;
	},

	_showMore: function () {
		this.setState({ fullIntro: !this.state.fullIntro });
	},
	
	render: function() {
		
		var {avatar, name, background, 
			tags, description, address,
			photos_count, promotions_count,
			likers_count, comments_count, opinions_count
		} = this.state.user.data;

		avatar = avatar || {};
		background = background || {};

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
			   		{/*NIHAO*/}
	            	<Section hideSeparator={true}>
		              	<CustomCell cellHeight={200}>
			              <Text style={styles.cellLabel}>Tags</Text>
			              <View style={styles.cellContent}>
			              {(()=>{
			              	if (tags && tags[1])
			              		return <TagsView tags={ tags || [] }/>
			              	else
			              		return <Text style={[styles.cellText]}>{ 'none' }</Text>
			              })()}	
			              </View>
			            </CustomCell>
			            <CustomCell cellHeight={60}>
			              <Text style={styles.cellLabel}>Location</Text>
			              <View style={styles.cellContent}>
			              	<Text style={[styles.cellText, {color: theme.colors.MAIN}]}>{ address || 'none' }</Text>
			              </View>
			            </CustomCell>
			            <CustomCell cellHeight={60} onPress={this._showMore}>
			              <Text style={styles.cellLabel}>Intro</Text>
			              <View style={styles.cellContent}>
			              	{this._renderIntro()}
			              </View>
			            </CustomCell>
	            	</Section>

	            	<Section hideSeparator={true}>
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Promotions" detail={promotions_count} />
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Photos" detail={photos_count} />
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Commented" detail={opinions_count} />
			            <Cell cellstyle="RightDetail" titleTintColor={'#999'} accessory="DisclosureIndicator" title="Liked" detail={likers_count} />
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
