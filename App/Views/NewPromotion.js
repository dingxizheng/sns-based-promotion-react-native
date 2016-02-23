/* 
* @Author: dingxizheng
* @Date:   2016-02-17 16:00:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-21 21:00:42
*/

'use strict';

var React                = require('react-native');
var Icon                 = require('react-native-vector-icons/MaterialIcons');
var theme                = require('../theme');
var KeyboardSpacer       = require('react-native-keyboard-spacer');
var CustomButtonsMixin   = require('../CustomButtonsMixin');
var EditTags             = require('./EditTagsView');
var EditImages           = require('./EditImagesView');
var LoadingView          = require('./LoadingView');

var {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    ScrollView
} = React;

var {Promotion, Resource, uploadImage, Feeds} = require('../apis');

var NewPromotion = React.createClass({
    mixins: [CustomButtonsMixin],

    getInitialState: function() {
        return {
            loading: false 
        };
    },

    rightButtonsDidMount: function() {
        this.setRightButtons([
            {
                text: 'Post',
                onPress: this._postPromotion
            }
        ]);
    },

    _postPromotion: async function() {
        this.setState({loading: true});
        try {
            var promotion = new Promotion({
                body: this.body,
                tags: this.tags,
                price: this.price
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
    },

    _imagesChange: function(images) {
        this.images = images;
    },

    _onKeyPress: function(e) {
        if (e.nativeEvent.key === 'Enter')
            this._postPromotion();
    },

    _onChangeText: function(e) {
        this.body = e;
    },

    _onChangePirce: function(e) {
        this.price = e;
    },
    
    render: function() {
        return (
            <ScrollView style={styles.container}>
                <LoadingView isVisible={this.state.loading} />
                <View style={styles.content}>
                    <View style={styles.promotionBody}>
                        <TextInput
                            onKeyPress={this._onKeyPress}
                            onChangeText={this._onChangeText} 
                            style={styles.contentInput}
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="send"
                            maxLength={400}
                            multiline={true} 
                            autoFocus={true} 
                            placeholder={ this.props.placeholder || "promote what you have..." }/>
                        
                        <TextInput onChangeText={ this._onChangePirce } 
                            style={styles.priceInput} 
                            multiline={false}
                            keyboardType={"number-pad"}
                            placeholder={ this.props.placeholder || "price.." }/>
                        
                        <EditImages style={{backgroundColor: 'white', margin: 10}} columns={3} square={false} imageHeight={100} imagesChange={this._imagesChange}/>
                    </View>
                    <EditTags style={{marginBottom: 5, backgroundColor: 'white', padding: 10, paddingBottom: 6}} tags={["promotion"]} tagsChange={this._tagsChange}/>
                </View>
            </ScrollView>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        backgroundColor: '#eee'
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
        backgroundColor: '#fff',
        height: 100,
        fontSize: 17,
        padding: 10,
        marginVertical: 5,
        color: theme.colors.DARK_GREY_FONT,
    },
    priceInput: {
        margin: 10,
        marginBottom: 0,
        flex: 1,
        height: 40,
        fontSize: 17,
        padding: 10,
        color: theme.colors.DARK_GREY_FONT,
        backgroundColor: '#eee'
    },
    footer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#eeeeee',
        borderTopColor: '#eeeeee',
        borderTopWidth: .5
    },
    footerMenuItemWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    footerMenuItemIcon: {
        color: theme.colors.GREY_FONT,
        fontSize: 22,
        padding: 3
    },
    footerMenuItemText: {
        color: theme.colors.GREY_FONT,
        fontSize: 13,
        padding: 3,
        paddingRight: 10,
    },
});


module.exports = NewPromotion;
