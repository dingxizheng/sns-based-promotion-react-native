'use strict';

var React                = require('react-native');
var Actions              = require('react-native-router-flux').Actions;
var theme                = require('../theme');
var moment               = require('moment');
var HTMLView             = require('react-native-htmlview');
var ImageGroup           = require('./ImagesView');
var TagsView             = require('./TagsView');
var ParallaxScrollView   = require('react-native-parallax-scroll-view');
var CustomButtonsMixin   = require('../CustomButtonsMixin');
var TimerMixin           = require('react-timer-mixin');
var Icon                 = require('react-native-vector-icons/MaterialIcons');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var BusyBox              = require('../Parts/BusyBox');

var {TableView, Section, Cell, CustomCell} = require('react-native-tableview-simple');
var {BottomActions, BottomItem} = require('./BottomActionsView');
var {StatusView, StatusItem}    = require('./StatusView');
var {Promotion, Resource, uploadImage} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image,
	TextInput,
	InteractionManager,
	LayoutAnimation
} = React;

var options = {
  title: 'Select Photo', 
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', 
  chooseFromLibraryButtonTitle: 'Choose from Library...', 
  cameraType: 'back',
  mediaType: 'photo', 
  allowsEditing: true, 
  noData: true,
};

var UserEditingView = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	getInitialState: function() {
	    return {
	    	user: this.props.user,
	    	fullIntro: false,
	    	renderPlaceHolderOnly: true
	    };
	},

	titleViewDidMount: function() {
        this.setTitleView("Edit Profile");
    },

    rightButtonsDidMount: function() {
    	this.setRightButtons([
    		{
    			text: '',
    			onPress: () => {}
    		}
    	]);
    },

	componentDidMount: function() {
		InteractionManager.runAfterInteractions(() => {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			this.setState({ renderPlaceHolderOnly: false });
	      	this._fetchInitial();
	    });
	},

	_fetchInitial: function() {
		// console.log("part", this.props.user.data);
		this.props.user.fetch().then(function(e) {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			this.setState({ user: this.props.user });
		}.bind(this));
	},

	_onChangeHeaderVisibility: function(e) {
	},

	_updateChanges: async function () {
		try {
			if (this.new_background) {
				var background = await uploadImage(this.new_background.uri);
				this.state.user.set({
					background: JSON.parse(background.data).image
				});
			}

			if (this.new_avatar) {
				var avatar = await uploadImage(this.new_avatar.uri);
				this.state.user.set({
					avatar: JSON.parse(avatar.data).image
				});
			}

			var result = await this.state.user.save();
			console.log(result);
			this.new_background = null;
			this.new_avatar = null;
			this.setState({ user: this.state.user });

			Actions.toast({ msg: 'Profile updated successfully!', type: 'info' });
		} catch (e) {
			console.log(e);
		}
	},

	selectPhoto: function(field) {
		UIImagePickerManager.showImagePicker(options, (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('UIImagePickerManager Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    // uri (on iOS)
		    const source = {uri: response.uri.replace('file://', ''), isStatic: true};

		    this['new_' + field] = source;

		    this.state.user.set({ [field]: { image_url: source.uri, thumb_url: source.uri } });
		    this.setState({ user: this.state.user });
		  }
		});
	},


	
	_updateField: function (field, value) {
		this.state.user.set({ [field]: value });
		this.setState({ user: this.state.user });
		this.setRightButtons([
    		{
    			text: 'Save',
    			onPress: this._updateChanges
    		}
    	]);
		return true;	
	},

	_showMore: function () {
		this.setState({ fullIntro: !this.state.fullIntro });
	},

	_editPhone: function() {
		Actions.simpleInput({
			title: "Change Phone", 
			placeholder: "phone number",
			initialValue: this.state.user.data.phone || '',
			textInputHeight: 30,
			buttonName: 'Done',
			onDone: (e) => this._updateField('phone', e)  
		});
	},

	_editName: function () {
		Actions.simpleInput({
			title: "Change Name", 
			placeholder: "profile name",
			initialValue: this.state.user.data.name || '',
			textInputHeight: 50,
			buttonName: 'Done',
			onDone: (e) => this._updateField('name', e) 
		});
	},

	_editAddress: function () {
		Actions.simpleInput({
			title: "Change Address", 
			placeholder: "address",
			initialValue: this.state.user.data.address || '',
			textInputHeight: 100,
			buttonName: 'Done',
			onDone: (e) => this._updateField('address', e) 
		});
	},

	_editAbout: function () {
		Actions.simpleInput({
			title: "Change Description", 
			placeholder: "description",
			initialValue: this.state.user.data.description || '',
			textInputHeight: 180,
			buttonName: 'Done',
			onDone: (e) => this._updateField('description', e) 
		});
	},

	_editTags: function() {
        Actions.autoComplete({ 
            rightButton: 'Add',
            content: require('../AutoComplete/Tags'),
            contentProps: { 
                initialTags: this.state.user.data.tags,
                onTagsChange: this._tagsChange
            }
        });
    },

    _tagsChange: function(tags) {
    	this._updateField('tags', tags);
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
				<TouchableOpacity style={styles.changeBg} onPress={() => this.selectPhoto('background')}>
					<Text style={styles.bgButtonText}>change background</Text>
				</TouchableOpacity>
			</View>
		);
	},

	_renderBackground: function() {
		var {background} = this.state.user.data;
		background = background || {};
		return (
			<View style={styles.background}>
				<Image style={{flex:1, resizeMode: 'cover', backgroundColor: '#eee'}} 
					source={{ uri: background.image_url }}/>
				<View style={styles.viewMask}/>
		 	</View>
		);
	},

	_renderStickyHeader: function() {
		var {name} = this.state.user;
		return (
			<View style={styles.stickyHeader}>
				<Text style={styles.stickrHeaderName}>{name}</Text>
		 	</View>
		);
	},

	_renderIntro: function (argument) {
		var {description} = this.state.user.data;
		return <Text style={styles.cellText}>{description || 'none'}</Text>;
	},
	
	render: function() {

		if (this.state.renderPlaceHolderOnly) {
			return <View style={{flex: 1, marginTop: 64, backgroundColor: '#FFFF'}}><BusyBox size={20}/></View>
		}
		
		var {avatar, name, background, 
			tags, description, address,
			photos_count, promotions_count, phone,
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
		      	parallaxHeaderHeight={200}
		      	onChangeHeaderVisibility={this._onChangeHeaderVisibility}
		      	renderBackground={this._renderBackground}
		      	renderForeground={this._renderForeground}>
			      
			   <TableView>
			   		{/*NIHAO*/}
	            	<Section hideSeparator={false}>

	            		<CustomCell cellHeight={60} onPress={() => this.selectPhoto('avatar')}>
			              <Text numberOfLines={1} style={styles.cellLabel}>Avatar</Text>
			              
			              <View style={styles.cellContent}>
			              		<Image style={{height:40, width:40, borderRadius: 20, resizeMode: 'cover', borderWidth: 1,}} 
									source={{ uri: avatar.thumb_url }}
									defaultSource={require('../../images/default_profile.jpg')}/>
			              </View>
			              <View style={styles.cellMarker}>
			              		<Icon style={styles.cellText} name="chevron-right"/>
			              </View>
			            </CustomCell>
	            		
	            		<CustomCell cellHeight={60} onPress={this._editName}>
			              <Text numberOfLines={1} style={styles.cellLabel}>Name</Text>
			              <View style={styles.cellContent}>
			              		<Text style={styles.cellText}>{name}</Text>
			              </View>
			              <View style={styles.cellMarker}>
			              		<Icon style={styles.cellText} name="chevron-right"/>
			              </View>
			            </CustomCell>
		              	
		              	<CustomCell cellHeight={200} onPress={this._editTags}>
			              <Text numberOfLines={1} style={styles.cellLabel}>Tags</Text>
			              <View style={styles.cellContent}>
			              {(()=>{
			              	if (tags && tags[1])
			              		return <TagsView tags={ tags || [] }/>
			              	else
			              		return <Text style={[styles.cellText]}>{ 'none' }</Text>
			              })()}	
			              </View>
			               <View style={styles.cellMarker}>
			              		<Icon style={styles.cellText} name="chevron-right"/>
			              </View>
			            </CustomCell>
			            
			            <CustomCell cellHeight={60} onPress={this._editAddress}>
			              <Text numberOfLines={1} style={styles.cellLabel}>Location</Text>
			              <View style={styles.cellContent}>
			              	<Text style={[styles.cellText, {color: theme.colors.MAIN}]}>{ address || 'none' }</Text>
			              </View>
			               <View style={styles.cellMarker}>
			              		<Icon style={styles.cellText} name="chevron-right"/>
			              </View>
			            </CustomCell>

			            <CustomCell cellHeight={60} onPress={this._editPhone}>
			              <Text numberOfLines={1} style={styles.cellLabel}>Work phone</Text>
			              <View style={styles.cellContent}>
			              		<Text style={styles.cellText}>{ phone || 'none'}</Text>
			              </View>
			              <View style={styles.cellMarker}>
			              		<Icon style={styles.cellText} name="chevron-right"/>
			              </View>
			            </CustomCell>
			            
			            <CustomCell cellHeight={60} onPress={this._editAbout}>
			              <Text numberOfLines={1} style={styles.cellLabel}>About</Text>
			              <View style={styles.cellContent}>
			              	{this._renderIntro()}
			              </View>
			              <View style={styles.cellMarker}>
			              		<Icon style={styles.cellText} name="chevron-right"/>
			              </View>
			            </CustomCell>
			            
	            	</Section>
	         	</TableView>
		    </ParallaxScrollView>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'column',
		marginTop: 64,
	},
	background: {
		height: 200,
		flex: 1
	},
	foreground: {
		height: 200,
		flex: 1,
		paddingBottom: 30,
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
	},
	changeBg: {
		position: 'absolute',
		right: 10,
		bottom: 6,
		height: 20, 
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor:  '#eee',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bgButtonText: {
		fontSize: 10,
		color: '#eee'
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
        fontSize: 13,
        color: '#999',
        overflow: 'hidden'
        // backgroundColor: '#eee'
    },
    cellContent: {
    	flex: 0.67,
    },
    cellMarker: {
    	flex: 0.08,
    	flexDirection: 'row',
    	justifyContent: 'flex-end'
    },
    cellText: {
    	fontSize: 15,
        color: theme.colors.DARK_GREY_FONT
    }
});

module.exports = UserEditingView;