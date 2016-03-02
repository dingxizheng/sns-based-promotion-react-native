/* 
* @Author: dingxizheng
* @Date:   2016-02-17 16:00:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 20:49:12
*/

'use strict';

var React              = require('react-native');
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
var Utilities          = require('../Utilities');
var KeyboardSpacer     = require('react-native-keyboard-spacer');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TagsView           = require('./TagsView');
var EditImages         = require('./EditImagesView');
var LoadingView        = require('./LoadingView');
var Actions            = require('react-native-router-flux').Actions;
var TableView          = require('react-native-tableview');
var dismissKeyboard    = require('dismissKeyboard');
var CustomTag          = require('../Parts/CustomTag');

var {BottomActions, BottomItem} = require('./BottomActionsView');

var {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    ScrollView,
    DeviceEventEmitter,
    InteractionManager,
    ActionSheetIOS
} = React;

var {Promotion, Resource, uploadImage, Feeds} = require('../apis');

var NewPromotion = React.createClass({
    
    mixins: [CustomButtonsMixin],

    getInitialState: function() {
        return {
            loading: false,
            keyboard: false,
            tags: ["promotion"],
            images: [],
            price: null,
            address: null,
        };
    },

    componentDidMount: function() {
        this._keyboardWillShowFunc = DeviceEventEmitter.addListener('keyboardWillShow', this._keyboardWillShow);
        this._keyboardWillHideFunc = DeviceEventEmitter.addListener('keyboardWillHide', this._keyboardWillHide);
        InteractionManager.runAfterInteractions(() => {
            this.refs.contentInput.focus();
        });
    }, 

    componentWillUnmount: function() {
        this._keyboardWillHideFunc.remove();
        this._keyboardWillShowFunc.remove(); 
    },

    _keyboardWillShow: function() {
        this.setState({ keyboard: true });
    },

    _keyboardWillHide: function() {
        this.setState({ keyboard: false });
    },

    rightButtonsDidMount: function() {
        this.setRightButtons([
            {
                text: 'Post',
                onPress: this._postPromotion
            }
        ]);
    },

    leftButtonsDidMount: function() {
        this.setLeftButtons([
            {
                icon: 'close',
                onPress: Actions.pop
            }
        ]);
    },

    _addImage: function() {
        Utilities.selectPhoto({}, function(image) {
            this.state.images.push(image);
            this.setState({
                images: this.state.images
            });
        }.bind(this));
    },

    _postPromotion: async function() {
        this.setState({loading: true});
        try {
            var promotion = new Promotion({
                body: this.body,
                tags: this.tags,
                price: this.state.price,
                coordinates: this.coordinates || [],
                address: this.state.address
            });

            var result = await promotion.save();
            
            var images = await this.images.reduce(async function(sum, img) {
                var image = await uploadImage(img.uri);
                var sum = await sum;
                sum.push(JSON.parse(image.data).image);
                return sum;
            }, []);

            if (images.length > 0)
                await promotion.set({ photos: images }).save();

            Actions.pop();
        
        } catch(e) {
            console.log(e);
        }
        this.setState({loading: false});
    },

    _tagsChange: function(tags) {
        this.tags = tags;
        this.setState({
            tags: tags
        });
    },

    _imagesChange: function(images) {
        this.images = images;
    },

    _onKeyPress: function(e) {
        // if (e.nativeEvent.key === 'Enter')
            // this._postPromotion();
    },

    _onChangeText: function(e) {
        this.body = e;
    },

    _onChangePirce: function(e) {
        this.price = e;
    },

    _editTags: function() {
        Actions.autoComplete({ 
                    rightButton: 'Add',
                    content: require('../AutoComplete/Tags'),
                    contentProps: { 
                        initialTags: this.state.tags,
                        onTagsChange: this._tagsChange
                    }
                });

    },

    _showPriceTagOptions: function() {
        ActionSheetIOS.showActionSheetWithOptions({
          options: [
            "Edit Price",
            "Delete Price",
            "Cancel"
          ],
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
        },
        (buttonIndex) => {
            if(buttonIndex === 1) 
                this.setState({ price: null });

            if(buttonIndex === 0)
                this._addPriceTag();
        });
    },

    _showLocationTagOptions: function() {
        ActionSheetIOS.showActionSheetWithOptions({
          options: [
            "Edit Location",
            "Delete Location",
            "Cancel"
          ],
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
        },
        (buttonIndex) => {
            if(buttonIndex === 1) 
                this.setState({ address: null });

            if(buttonIndex === 0)
                this._addLocation();
        });
    },

    _showAddLocationOptions: function() {
        ActionSheetIOS.showActionSheetWithOptions({
          options: [
            "Current Location",
            "Custom Location",
            "Cancel"
          ],
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
            if(buttonIndex === 0) 
                this._fetchLocation();

            if(buttonIndex === 1)
                this._addLocation();
        });
    },

    _fetchLocation: function() {
        navigator.geolocation.getCurrentPosition(
            (location)=> {

                Utilities.geocodeReverse(location.coords.latitude, location.coords.longitude)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        return data.results.filter((addr)=> {return addr.types.indexOf("street_address") !== -1});
                    })
                    .then((data) => {
                        
                        if (data.length > 0) {

                            this.coordinates = [location.coords.longitude, location.coords.latitude];
                            this.setState({
                                address: data[0].formatted_address
                            });

                        } else {
                            Actions.toast({
                                msg: 'Unable to fetch street address for current location!',
                                view_type: 'error'
                            });
                        }

                    });

            }, 
            (error)=> {
                Actions.toast({
                    msg: error.message,
                    view_type: 'error'
                });
            }, 
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0});
    },

    _addPriceTag: function() {
        Actions.simpleInput({
            title: "Price", 
            placeholder: "price...",
            initialValue: this.state.price || '',
            textInputHeight: 50,
            buttonName: 'Done',
            onDone: (e) => {this.setState({ price: e }); return true; }
        });
    },

    _addLocation: function() {
        Actions.autoComplete({ 
         rightButton: 'Done',
         initialValue: this.state.address || '',
         content: require('../AutoComplete/Address'),
         contentProps: {
            onDone: (e) => {this.setState({ address: e }); return true; }
         }
        });
    },

    render: function() {
        return (
            <View style={{ flex: 1, marginTop: 64, backgroundColor: 'white' }}>
                <ScrollView style={styles.containerWrapper}>
                    <LoadingView isVisible={this.state.loading}/>

                    <TextInput
                        ref="contentInput"
                        onKeyPress={this._onKeyPress}
                        onChangeText={this._onChangeText} 
                        style={styles.contentInput}
                        autoCorrect={false}
                        autoCapitalize="none"
                        maxLength={400}
                        multiline={true} 
                        placeholder={ "promote what you have..." }/>

                    {(()=>{
                        if (this.state.price)
                            return <CustomTag style={{backgroundColor: 'white', margin: 10, marginBottom: 0, }}
                                        onPress={this._showPriceTagOptions}
                                        icon="attach-money" 
                                        text={this.state.price + ''}/>
                            return null
                    })()}

                    {(()=>{
                        if (this.state.address)
                            return <CustomTag style={{backgroundColor: 'white', margin: 10, marginBottom: 0, }}
                                        onPress={this._showLocationTagOptions}
                                        icon="place" 
                                        text={this.state.address + ''}/>
                        return null
                    })()}
                    

                    <TagsView
                        maxNumber={100}
                        lastButton="Edit Tags"
                        onLastButton={this._editTags}
                        style={{ margin:10, marginBottom: 8 }}
                        tags={this.state.tags}/>

                     <EditImages 
                        style={{backgroundColor: 'white', margin: 10, marginTop: 0}} 
                        columns={4}
                        square={true} 
                        imageHeight={100} 
                        images={this.state.images}
                        imagesChange={this._imagesChange}/>
                    
                </ScrollView>

                
                <BottomActions style={{ height: 45, backgroundColor: 'white' }} separatorHeight={26}>
                    <BottomItem
                        type="icon-only"
                        icon="attach-money"
                        onPress={this._addPriceTag}
                        iconStyle={{ fontSize: 20}}/>
                    <BottomItem
                        type="icon-only"
                        icon={this.state.address ? "edit-location" : "add-location" }
                        onPress={this.state.address ? this._addLocation : this._showAddLocationOptions}
                        iconStyle={{ fontSize: 20}}/>
                    <BottomItem
                        type="icon-only"
                        icon="add-a-photo"
                        onPress={this._addImage}
                        iconStyle={{ fontSize: 20}}/>
                    <BottomItem
                        type="icon-only"
                        icon="link"
                        iconStyle={{ fontSize: 20}}/>
                    <BottomItem
                        type="icon-only"
                        iconStyle={{ fontSize: 20}}
                        onPress={()=>{ dismissKeyboard() }}
                        icon={ this.state.keyboard ? "keyboard-hide" : "keyboard-arrow-up" }/>
                </BottomActions>

                <KeyboardSpacer/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#EdEdEd',
        paddingTop: 8,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eee'
    },
    promotionBody: {
        backgroundColor: '#fff',
        marginVertical: 5
    },
    contentInput: {
        flex: 1,
        height: 150,
        backgroundColor: '#fff',
        fontSize: 17,
        padding: 10,
        color: theme.colors.DARK_GREY_FONT,
    },
    priceInput: {
        flex: 1,
        height: 40,
        fontSize: 17,
        padding: 10,
        color: theme.colors.DARK_GREY_FONT,
    },
});

module.exports = NewPromotion;
