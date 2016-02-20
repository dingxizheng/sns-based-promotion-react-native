/* 
* @Author: dingxizheng
* @Date:   2016-02-17 16:00:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-19 17:30:08
*/

'use strict';

var React              = require('react-native');
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
var KeyboardSpacer     = require('react-native-keyboard-spacer');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var EditTags           = require('./EditTagsView');
var EditImages = require('./EditImagesView');

var {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    ScrollView
} = React;

var NewPromotion = React.createClass({
    mixins: [CustomButtonsMixin],

    rightButtonsDidMount: function() {
        this.setRightButtons([
            {
                text: 'Post',
                onPress: function() {}
            }
        ]);
    },
    
    render: function() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.promotionBody}>
                        <TextInput onChangeText={this.onChangeText} 
                            style={styles.contentInput} 
                            multiline={true} 
                            autoFocus={true} 
                            placeholder={ this.props.placeholder || "promote what you have..." }/>
                        <EditImages style={{backgroundColor: 'white', margin: 10}} columns={3} square={false} imageHeight={100}/>
                    </View>
                    <EditTags style={{marginBottom: 5, backgroundColor: 'white', padding: 10, paddingBottom: 6}} tags={["promotion"]} />
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
        color: theme.colors.GREY_FONT,
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
